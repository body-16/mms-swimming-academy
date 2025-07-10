import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/MMS-Swimming-Academy/', // استبدل باسم مستودعك بالضبط
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src')
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
  }
});
