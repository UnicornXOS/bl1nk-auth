import { NextResponse, NextRequest } from 'next/server';

function createCorsResponse(body: any, status: number) {
  const response = NextResponse.json(body, { status });
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5000');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

export async function POST(_req: NextRequest){
  const res = createCorsResponse({ ok:true }, 200);
  res.cookies.set('bl1nk_refresh','',{ httpOnly:true, secure:true, sameSite:'lax', path:'/', maxAge:0 });
  return res;
}

export async function OPTIONS(_req: NextRequest) {
  return createCorsResponse({}, 200);
}
