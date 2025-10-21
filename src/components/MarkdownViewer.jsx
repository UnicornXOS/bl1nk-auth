import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownViewer = ({ filePath, isDark }) => {
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.statusText}`);
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (err) {
        console.error("Error fetching markdown:", err);
        setError(err.message);
      }
    };

    fetchMarkdown();
  }, [filePath]);

  if (error) {
    return <div className="text-red-500">Error loading document: {error}</div>;
  }

  if (!markdown) {
    return <div className="text-gray-500">Loading document...</div>;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={isDark ? dracula : solarizedlight}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" />
        ),
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
        table: ({ node, ...props }) => <table className="min-w-full divide-y divide-gray-200 my-4" {...props} />,
        th: ({ node, ...props }) => <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props} />,
        td: ({ node, ...props }) => <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" {...props} />,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownViewer;
