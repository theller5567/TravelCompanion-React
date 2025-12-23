import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/v1': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        secure: true,
      },
      '/amadeus': {
        target: 'https://test.api.amadeus.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/amadeus/, ''), // Strips /amadeus from the URL before forwarding
      },
    }
  }
})
