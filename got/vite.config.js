import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      external: ['@reduxjs/toolkit', 'sweetalert2'], // Combine both into a single array
    }
  }
});
