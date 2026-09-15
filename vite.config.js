import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    hmr: {
      host: "localhost",
      protocol: "ws",
      port: 5173,
    },
  },
});