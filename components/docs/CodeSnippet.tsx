"use client";

import { useState } from "react";
import type { JSX } from "react";

export function CodeSnippet({ code }: { code: string }): JSX.Element {
  const [copying, setCopying] = useState(false);

  return (
    <div className="relative rounded-lg border bg-card">
      <pre className="p-4 text-sm overflow-auto">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        className="absolute top-3 right-3 px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm"
        onClick={async () => {
          setCopying(true);
          try {
            await navigator.clipboard.writeText(code);
          } finally {
            setCopying(false);
          }
        }}
      >
        {copying ? "Copying…" : "Copy"}
      </button>
    </div>
  );
}
