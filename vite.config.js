import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/pages",
    },
  },
  plugins: [react()],
});
