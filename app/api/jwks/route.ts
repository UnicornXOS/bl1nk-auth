import { jwks } from '@/lib/crypto';

export async function GET(): Promise<Response> {
  const body = await jwks();
  return Response.json(body);
}

