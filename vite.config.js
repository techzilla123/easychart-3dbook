import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // relative paths for assets, fixes Vercel 404 issues
  build: {
    outDir: 'dist',
    assetsDir: '', // optional: keeps assets at root of build folder
  },
})
