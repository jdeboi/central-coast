import { defineConfig } from "vite";

export default defineConfig({
  root: "./src", // Points to the source directory
  base: '/central-coast/',
  build: {
    rollupOptions: {
      input: {
        main: "./src/weeds/index.html",
        agave: "./src/agave/index.html",
        sheen: "./src/sheen/index.html",
        splishsplash: "./src/splishsplash/index.html",
      },
    },
    outDir: "../dist", // Output directory for the build
  },
  server: {
    open: "/central-coast/splishsplash/", 
  },
});
