import { defineConfig } from "vite";
import injectHTML from 'vite-plugin-html-inject';
import { resolve } from 'path';

export default defineConfig({
  root: "./src",
  base: '/central-coast/',
	plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/weeds/index.html'),
        agave: resolve(__dirname, 'src/agave/index.html'),
        sheen: resolve(__dirname, 'src/agave/index.html'),
        splishsplash: resolve(__dirname, 'src/splishsplash/index.html'),
      },
    },
    outDir: "../dist",
  },
  server: {
    open: "/central-coast/splishsplash/", 
  },
});
