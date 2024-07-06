import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //  host: true is used to run local host on your divice
    host: true,
    proxy: {
      "/api/": "https://sp-project-e-commerce.onrender.com/",
      "/uploads/": "https://sp-project-e-commerce.onrender.com/",
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});