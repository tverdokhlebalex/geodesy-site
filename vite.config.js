import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/", // Указываем base, чтобы GitHub Pages корректно работал
  server: {
    port: 5173,
    open: true, // Автоматически открывает браузер
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/index.html",
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Позволяет использовать @/ вместо полного пути
    },
  },
});
