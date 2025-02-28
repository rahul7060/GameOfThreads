import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
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
