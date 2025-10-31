import type { JSX } from 'react';

interface CodeSnippetProps {
  code: string;
  language?: string;
}

export default function CodeSnippet({ code, language = 'bash' }: CodeSnippetProps): JSX.Element {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-100 overflow-x-auto">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
        aria-label="Copy code"
      >
        Copy
      </button>
      <pre className="pr-16">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}