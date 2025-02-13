import { defineConfig } from "vite";

export default defineConfig({
  root: "src", // Указываем src как корневую папку
  build: {
    outDir: "dist", // Собираем в dist (НЕ "../dist")
    emptyOutDir: true, // Очищаем dist перед каждой сборкой
  },
});
