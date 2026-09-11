import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // The deployed app lives at /robot/. Use an absolute base in production so
  // /robot and /robot/ resolve their assets identically. Keep the dev server
  // rooted at / for local development inside this subproject.
  base: command === 'build' ? '/robot/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
    cors: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}));
