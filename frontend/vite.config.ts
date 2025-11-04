import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/static/',
  build: {
    outDir: resolve(__dirname, '../backend/frontend_dist'),
    emptyOutDir: true,
    manifest: false,
  },
})
