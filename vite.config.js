import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react({
      // jsxRuntime: "automatic",
      // jsxImportSource: "src/jsxRuntime",
      babel: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              runtime: "classic",
              pragma: "createElement",
            },
          ],
        ],
      },
    }),
  ],
});
