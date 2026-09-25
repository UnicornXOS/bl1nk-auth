import { type NextRequest, NextResponse } from "next/server";
import { handleMcpRequest, type McpToolCallRequest } from "@/lib/mcp/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body: McpToolCallRequest = await req.json();
    const response = await handleMcpRequest(body);
    return NextResponse.json(response);
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: { code: -32700, message: `Parse error: ${error.message}` },
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    name: "bl1nk-auth MCP Integration Server",
    version: "1.0.0",
    endpoint: "/api/mcp",
  });
}
