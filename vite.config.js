import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";

export default defineConfig({
  base: "/",
  root: "src", // Корень: src
  build: {
    outDir: "../dist", // Сборка на уровень выше
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // Если нужны about, contacts и т.д., добавьте
      },
    },
  },
  plugins: [
    copy({
      targets: [
        // копируем файлы *.html из src/components => ../dist/components
        { src: "components/*.html", dest: "../dist/components" },
      ],
      hook: "writeBundle",
    }),
  ],
  server: {
    port: 5173,
    open: true,
  },
});
