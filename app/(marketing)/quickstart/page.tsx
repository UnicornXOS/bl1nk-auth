import { CodeSnippet } from '@/components/code-snippet';
import type { JSX } from 'react';

export default function Page(): JSX.Element {
  const code = `curl -X POST http://localhost:3000/index -H 'content-type: application/json' -d '{"id":"doc1","text":"Hello context"}'`;
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Quickstart</h1>
      <CodeSnippet code={code} />
    </div>
  );
}
