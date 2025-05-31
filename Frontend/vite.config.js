import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      "/users": "http://localhost:3000",
      "/tweets": "http://localhost:3000",
      "/login": "http://localhost:3000",
      "/register": "http://localhost:3000",
      "/follow": "http://localhost:3000",
    },
  },
});
