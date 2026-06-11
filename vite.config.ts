import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/blind-control-card.ts", import.meta.url)),
      formats: ["es"],
      fileName: () => "blind-control-card.js"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    },
    sourcemap: false,
    emptyOutDir: true
  }
});
