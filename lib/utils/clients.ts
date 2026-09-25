import clients from "@/config/clients.json";

interface ClientConfig {
  client: string;
  returns: string[];
}

export function getClient(client: string | undefined): ClientConfig | null {
  if (!client) return null;
  try {
    return (clients as ClientConfig[]).find((c) => c.client === client) || null;
  } catch (_error) {
    return null;
  }
}

export function isReturnAllowed(clientCfg: ClientConfig | null, ret: string): boolean {
  if (!clientCfg || !Array.isArray(clientCfg.returns)) {
    return false;
  }

  try {
    new URL(ret);
    return clientCfg.returns.some((r: string) => ret.startsWith(r));
  } catch (_error) {
    return false;
  }
}
