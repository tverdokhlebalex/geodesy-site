import gulp from "gulp";
import fileInclude from "gulp-file-include";
import del from "del"; // ✅ Используем default import
import browserSyncLib from "browser-sync";

const browserSync = browserSyncLib.create();
const { src, dest, watch, series, parallel } = gulp;

// Пути к файлам
const paths = {
  src: {
    html: "src/*.html",
    partials: "src/partials/*.html",
    images: "src/assets/images/**/*.{png,jpg,jpeg,svg,webp}",
    assets: "src/assets/**/*.*",
  },
  dist: {
    base: "docs/",
    images: "docs/assets/images/",
    assets: "docs/assets/",
  },
};

// === Задачи ===

// 1️⃣ Очистка папки docs
export function clean() {
  console.log("Cleaning docs folder...");
  return del([paths.dist.base]); // ✅ Используем `del()` вместо `deleteAsync`
}

// 2️⃣ Обработка HTML с fileInclude
export function html() {
  console.log("Processing HTML...");
  return src([paths.src.html, "!src/partials/**"])
    .pipe(
      fileInclude({
        prefix: "@@", // Префикс для include
        basepath: "@file",
      })
    )
    .on("error", (err) => console.error("HTML Error:", err))
    .pipe(dest(paths.dist.base));
}

// 3️⃣ Копирование изображений
export function copyImages() {
  console.log("Copying images...");
  return src(paths.src.images).pipe(dest(paths.dist.images));
}

// 4️⃣ Копирование других ассетов
export function copyAssets() {
  console.log("Copying assets...");
  return src([paths.src.assets, `!${paths.src.images}`]).pipe(
    dest(paths.dist.assets)
  );
}

// 5️⃣ Локальный сервер (browser-sync)
export function serve(done) {
  console.log("Starting server...");
  browserSync.init({
    server: { baseDir: paths.dist.base },
    port: 3000,
    open: true,
  });
  done();
}

// 6️⃣ Слежка за файлами
export function watchFiles() {
  console.log("Watching files for changes...");
  watch(paths.src.html, series(html, reloadBrowser));
  watch(paths.src.partials, series(html, reloadBrowser));
  watch(paths.src.images, series(copyImages, reloadBrowser));
  watch(paths.src.assets, series(copyAssets, reloadBrowser));
}

// 🔄 Перезагруз�