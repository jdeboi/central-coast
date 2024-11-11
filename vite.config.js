import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  root: "./src",
  base: "/central-coast/",
  plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        about: resolve(__dirname, "src/about/index.html"),
        agave: resolve(__dirname, "src/agave/index.html"),
        weeds: resolve(__dirname, "src/weeds/index.html"),
        sheen: resolve(__dirname, "src/sheen/index.html"),
        splishsplash: resolve(__dirname, "src/splishsplash/index.html"),
        starrynight: resolve(__dirname, "src/starrynight/index.html"),
      },
    },
    outDir: "../dist",
  },
  server: {
    open: "/central-coast/splishsplash/",
  },
});
