import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
})
