import { NextRequest, NextResponse } from 'next/server';
import { ENV } from '@/lib/env';
import { verifyJWT, signJWT } from '@/lib/crypto';
import { z } from 'zod';

const Body = z.object({ ott: z.string(), audience: z.string().default(ENV.AUD) });

// Helper function to create a response with CORS headers
function createCorsResponse(body: any, status: number) {
  const response = NextResponse.json(body, { status });
  // Allow requests from GraphicAI
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function POST(req: NextRequest){
  const body = Body.safeParse(await req.json());
  if(!body.success) return createCorsResponse({error:'bad_request'}, 400);
  try{
    const ottPayload = await verifyJWT(body.data.ott, {aud:'auth', iss: ENV.ISSUER});
    if(ottPayload['type'] !== 'ott') throw new Error('not_ott');
    const jwt = await signJWT({ sub:String(ottPayload.sub), scope:['profile:read','email:read','github:public_repo'] }, {aud: body.data.audience, iss: ENV.ISSUER, expSeconds: 30*60});
    return createCorsResponse({ jwt }, 200);
  }catch(e:any){
    return createCorsResponse({error:'invalid_ott', detail: e?.message}, 401);
  }
}

// Add an OPTIONS handler for preflight requests from the browser
export async function OPTIONS(_req: NextRequest) {
  return createCorsResponse({}, 200);
}
