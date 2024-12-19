import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxInject: `import { createElement, Fragment } from '/libs/jsx/createElement.ts'`,
    // 모든 JSX 파일에 자동으로 import
    jsxFactory: "createElement",
    // JSX가 createElement 함수로 변환
    jsxFragment: "Fragment",
  },
});
