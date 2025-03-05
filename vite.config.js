import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";

export default defineConfig({
  base: "/",

  root: "src",

  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        contacts: resolve(__dirname, "src/contacts.html"),
      },
    },
  },

  plugins: [
    copy({
      targets: [
        {
          // Путь к копируемым файлам относительно корня проекта
          src: "src/components/**/*",
          dest: "dist/components",
        },
      ],
      hook: "writeBundle",
    }),
  ],

  server: {
    port: 5173,
    open: true,
  },
});
