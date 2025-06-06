import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "http://localhost:3000",
      "/tweets": "http://localhost:3000",
      "/login": "http://localhost:3000",
      "/register": "http://localhost:3000",
      "/profile": "http://localhost:3000", // ✅ behövs
      "/follow": "http://localhost:3000",
    },
  },
});
