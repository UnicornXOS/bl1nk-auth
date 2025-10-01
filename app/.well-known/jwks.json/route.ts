import { jwks } from '@/lib/crypto';
export async function GET(){ return Response.json(await jwks()); }
