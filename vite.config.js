import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: 'src/index.html',
      },
    },
  },
  base: command === 'build' ? '/burger-house-website/' : '/',
}))