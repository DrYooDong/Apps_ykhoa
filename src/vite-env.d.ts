/// <reference types="vite/client" />

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module 'astro:content' {
  export const defineCollection: any;
  export const z: any;
}

declare module 'astro/loaders' {
  export const glob: any;
}
