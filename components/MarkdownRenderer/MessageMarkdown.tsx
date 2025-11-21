'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageMarkdownProps {
  content: string;
}

export default function MessageMarkdown({ content }: MessageMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Code blocks with syntax highlighting
        code({ node, inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={vscDarkPlus}
              language={match[1]}
              PreTag="div"
              className="rounded-md text-sm"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className="rounded bg-gray-200 px-1.5 py-0.5 text-sm font-mono text-gray-800" {...props}>
              {children}
            </code>
          );
        },
        // Links
        a({ node, children, ...props }: any) {
          return (
            <a
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          );
        },
        // Paragraphs
        p({ node, children, ...props }: any) {
          return <p className="mb-2 last:mb-0" {...props}>{children}</p>;
        },
        // Headings
        h1({ node, children, ...props }: any) {
          return <h1 className="mb-2 text-2xl font-bold" {...props}>{children}</h1>;
        },
        h2({ node, children, ...props }: any) {
          return <h2 className="mb-2 text-xl font-bold" {...props}>{children}</h2>;
        },
        h3({ node, children, ...props }: any) {
          return <h3 className="mb-2 text-lg font-bold" {...props}>{children}</h3>;
        },
        // Lists
        ul({ node, children, ...props }: any) {
          return <ul className="mb-2 ml-4 list-disc space-y-1" {...props}>{children}</ul>;
        },
        ol({ node, children, ...props }: any) {
          return <ol className="mb-2 ml-4 list-decimal space-y-1" {...props}>{children}</ol>;
        },
        // Blockquotes
        blockquote({ node, children, ...props }: any) {
          return (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700" {...props}>
              {children}
            </blockquote>
          );
        },
        // Tables
        table({ node, children, ...props }: any) {
          return (
            <div className="mb-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300 border" {...props}>
                {children}
              </table>
            </div>
          );
        },
        th({ node, children, ...props }: any) {
          return (
            <th className="bg-gray-100 px-3 py-2 text-left text-sm font-semibold" {...props}>
              {children}
            </th>
          );
        },
        td({ node, children, ...props }: any) {
          return <td className="px-3 py-2 text-sm" {...props}>{children}</td>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

