import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxInject: `import { createElement, Fragment } from '/libs/jsx/createElement.ts'`,
    jsxFactory: "createElement",
    jsxFragment: "Fragment",
  },
});
