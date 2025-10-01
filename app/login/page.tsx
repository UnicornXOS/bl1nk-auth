'use client';
export default function Login(){
  const start = () => location.href = `/api/login?client=note&return=${encodeURIComponent('http://localhost:5173/cb')}`;
  return (<main style={{height:'100dvh',display:'grid',placeItems:'center'}}>
    <button onClick={start} style={{padding:'12px 16px',borderRadius:12,background:'#1CA7EC',color:'#fff'}}>Sign in with GitHub</button>
  </main>);
}
