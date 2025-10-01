import clients from '@/config/clients.json';
export function getClient(client: string|undefined){
  if(!client) return null;
  return (clients as any[]).find(c=>c.client===client) || null;
}
export function isReturnAllowed(clientCfg:any, ret:string){
  try{
    const url = new URL(ret);
    return clientCfg.returns.some((r:string)=> ret.startsWith(r));
  }catch{ return false; }
}
