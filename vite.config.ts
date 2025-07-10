import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '~': path.resolve(__dirname, './client')
    }
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, './client/index.html')
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
