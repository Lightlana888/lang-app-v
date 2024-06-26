import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      "/api": {
        target: "https://itgirlschool.justmakeit.ru",
        changeOrigin: true,
        secure: true
      },
    },
  },
});