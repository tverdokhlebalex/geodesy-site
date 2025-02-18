import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";

export default defineConfig({
  base: "/geodesy-site/", // Указываем base, чтобы GitHub Pages корректно работал
  root: "src", // Указываем корневую папку как src
  build: {
    outDir: "../dist", // Выходная директория
    emptyOutDir: true, // Очищаем перед билдом
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"), // Указываем путь 