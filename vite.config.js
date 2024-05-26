import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "./",
  server: {
    proxy: {
      // Проксирование всех запросов, начинающихся с '/api':
      "/api": {
        target: "http://itgirlschool.justmakeit.ru",
        changeOrigin: true,
      },
    },
  },

})
