import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Change this base path if your GitHub Pages repository name changes.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/school-website/' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000',
      '/uploads': 'http://127.0.0.1:5000'
    }
  }
}));
