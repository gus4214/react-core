import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxInject: `import { createElement } from '/libs/jsx/createElement.js'`,
    jsxFactory: "createElement",
  },
});
