export default function Page(){
  return (
    <main style={{padding:'24px'}}>
      <h1>bl1nk-auth</h1>
      <p>ศูนย์ล็อกอินกลางสำหรับหลายงาน</p>
      <ul>
        <li>เริ่ม: <code>/api/login?client=note&return=http://localhost:5173/cb</code></li>
        <li>JWKS: <code>/.well-known/jwks.json</code></li>
      </ul>
    </main>
  );
}
