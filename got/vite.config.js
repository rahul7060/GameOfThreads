

import { defineConfig } from 'vite'
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: [
        '@reduxjs/toolkit',
        'react-redux',
        'sweetalert2',
        'axios',
        'react-router-dom'
      ]
    }
  }
});