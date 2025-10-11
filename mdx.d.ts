/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.mdx' {
  const MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
