import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'keen-slider/react': path.resolve(__dirname, 'node_modules/keen-slider/react.es.js'),
    },
  },
})
