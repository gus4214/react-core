import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  esbuild: {
    jsxInject: `import { createElement, Fragment } from '/libs/jsx/createElement.ts'`,
    // 모든 JSX 파일에 자동으로 import
    jsxFactory: "createElement",
    // JSX가 createElement 함수로 변환
    jsxFragment: "Fragment",
  },
  resolve: {
    // TypeScript paths 설정은 Typescript 컴파일러에서만 적용
    // 따라서 경로 별칭 설정 필요
    alias: {
      src: path.resolve(__dirname, "./src"),
      libs: path.resolve(__dirname, "./libs"),
    },
  },
});
