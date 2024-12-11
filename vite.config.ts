import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: ["public", "src", "src/mocks"],
    },
  },
  plugins: [react()],
});
