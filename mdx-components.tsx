import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="mb-6 text-4xl font-semibold tracking-normal" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-normal" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="mb-3 mt-8 text-xl font-semibold tracking-normal" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-7 text-zinc-300" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a className="text-violet-300 underline-offset-4 hover:underline" {...props}>
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 list-disc space-y-2 pl-5 text-zinc-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5 text-zinc-300" {...props}>
      {children}
    </ol>
  ),
  code: ({ children, ...props }) => (
    <code
      className="rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-mono text-sm text-violet-200"
      {...props}
    >
      {children}
    </code>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
