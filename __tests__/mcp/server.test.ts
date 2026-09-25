import { handleMcpRequest } from "@/lib/mcp/server";

describe("MCP Server Handler", () => {
  it("should list available MCP tools", async () => {
    const res = await handleMcpRequest({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/list",
    });

    expect(res.jsonrpc).toBe("2.0");
    expect(res.id).toBe(1);
    expect(res.result).toBeDefined();
    const content = JSON.parse(res.result?.content[0].text ?? "{}");
    expect(content.tools).toBeDefined();
    expect(content.tools.length).toBe(5);
  });

  it("should return JWKS keys via auth_get_jwks tool", async () => {
    const res = await handleMcpRequest({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "auth_get_jwks",
        arguments: {},
      },
    });

    expect(res.result).toBeDefined();
    const content = JSON.parse(res.result?.content[0].text ?? "{}");
    expect(content.keys).toBeDefined();
  });

  it("should return connector status via connector_status tool", async () => {
    const res = await handleMcpRequest({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "connector_status",
        arguments: {},
      },
    });

    expect(res.result).toBeDefined();
    const content = JSON.parse(res.result?.content[0].text ?? "{}");
    expect(content.connectors).toBeDefined();
  });

  it("should execute sandbox code via sandbox_run tool", async () => {
    const res = await handleMcpRequest({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "sandbox_run",
        arguments: { code: "10 + 20" },
      },
    });

    expect(res.result).toBeDefined();
    const content = JSON.parse(res.result?.content[0].text ?? "{}");
    expect(content.result).toBe(30);
  });
});
