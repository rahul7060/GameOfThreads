import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      external: ['@reduxjs/toolkit'], // Explicitly mark Redux Toolkit as external
    }
  }
});
