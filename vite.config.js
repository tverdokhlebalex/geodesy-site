import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";

export default defineConfig({
  base: "/geodesy-site/", // Указываем base, чтобы GitHub Pages корректно работал
  root: "src",
  envPrefix: "VITE_",
  build: {
    outDir: "../dist", // Выходная директория
    emptyOutDir: true, // Очищаем перед билдом
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"), // Указываем путь к index.html
      },
    },
  },
  plugins: [
    copy({
      targets: [
        { src: "src/components/*", dest: "dist/components" }, // Копируем header и footer в dist
      ],
      hook: "writeBundle",
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"), // Упрощаем импорт файлов через @/
    },
  },
  server: {
    port: 5173,
    open: true, // Автоматически открываем браузер при запуске dev-сервера
  },
});
