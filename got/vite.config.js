import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

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
        'react',
        'react-dom',
        'react-router-dom'
      ]
    }
  }
});
