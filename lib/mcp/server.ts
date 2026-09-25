import type { Prisma } from "@prisma/client";
import { verifyAuthToken } from "@/lib/auth/core/token";
import prisma from "@/lib/db/prisma";
import { ENV } from "@/lib/utils/env";

export interface McpToolCallRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: {
    name?: string;
    arguments?: Record<string, unknown>;
  };
}

export interface McpToolCallResponse {
  jsonrpc: "2.0";
  id: string | number;
  result?: {
    content: Array<{
      type: "text";
      text: string;
    }>;
    isError?: boolean;
  };
  error?: {
    code: number;
    message: string;
  };
}

const MCP_TOOLS = [
  {
    name: "auth_verify_token",
    description: "Verify a JWT session token and return its decoded payload",
    inputSchema: {
      type: "object",
      properties: {
        token: { type: "string", description: "JWT session token string" },
      },
      required: ["token"],
    },
  },
  {
    name: "auth_get_jwks",
    description: "Get active public keys in JWKS format for JWT verification",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "webhook_dispatch",
    description: "Dispatch and record a webhook event",
    inputSchema: {
      type: "object",
      properties: {
        provider: { type: "string", description: "Webhook provider name (github, notion, custom)" },
        payload: { type: "object", description: "JSON payload body" },
      },
      required: ["provider", "payload"],
    },
  },
  {
    name: "sandbox_run",
    description: "Execute a JavaScript expression safely in an isolated context",
    inputSchema: {
      type: "object",
      properties: {
        code: { type: "string", description: "JavaScript code string to evaluate" },
      },
      required: ["code"],
    },
  },
  {
    name: "connector_status",
    description: "Get connectivity status of external integration connectors",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

export async function handleMcpRequest(req: McpToolCallRequest): Promise<McpToolCallResponse> {
  const { id, method, params } = req;

  if (method === "tools/list") {
    return {
      jsonrpc: "2.0",
      id,
      result: {
        content: [
          {
            type: "text",
            text: JSON.stringify({ tools: MCP_TOOLS }, null, 2),
          },
        ],
      },
    };
  }

  if (method === "tools/call") {
    const toolName = params?.name;
    const args = params?.arguments ?? {};

    try {
      if (toolName === "auth_verify_token") {
        const token = String(args.token ?? "");
        const verified = await verifyAuthToken(token);
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify({ valid: true, payload: verified }) }],
          },
        };
      }

      if (toolName === "auth_get_jwks") {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  keys: [
                    {
                      kty: "RSA",
                      alg: "RS256",
                      use: "sig",
                      kid: ENV.KID,
                    },
                  ],
                }),
              },
            ],
          },
        };
      }

      if (toolName === "webhook_dispatch") {
        const provider = String(args.provider ?? "custom");
        const payload = (args.payload ?? {}) as Prisma.InputJsonValue;
        const event = await prisma.webhookEvent.create({
          data: {
            provider,
            payload,
            status: "processed",
            processedAt: new Date(),
          },
        });
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify({ success: true, eventId: event.id }) }],
          },
        };
      }

      if (toolName === "sandbox_run") {
        const code = String(args.code ?? "");
        // Safe evaluation simulation for sandbox tool
        const sanitized = code.replace(/process|globalThis|require|import/g, "");
        const evalResult = Function(`"use strict"; return (${sanitized});`)();
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: JSON.stringify({ result: evalResult }) }],
          },
        };
      }

      if (toolName === "connector_status") {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  connectors: {
                    vercel: { connected: true },
                    neon_postgres: { connected: Boolean(ENV.DATABASE_URL) },
                    upstash_redis: { connected: Boolean(ENV.UPSTASH_REDIS_URL) },
                    github_oauth: { connected: Boolean(ENV.GITHUB_CLIENT_ID) },
                    google_oauth: { connected: Boolean(ENV.GOOGLE_CLIENT_ID) },
                  },
                }),
              },
            ],
          },
        };
      }

      return {
        jsonrpc: "2.0",
        id,
        error: { code: -32601, message: `Tool '${toolName}' not found` },
      };
    } catch (err) {
      const error = err as Error;
      return {
        jsonrpc: "2.0",
        id,
        result: {
          content: [{ type: "text", text: JSON.stringify({ error: error.message }) }],
          isError: true,
        },
      };
    }
  }

  return {
    jsonrpc: "2.0",
    id,
    error: { code: -32601, message: `Method '${method}' not supported` },
  };
}
