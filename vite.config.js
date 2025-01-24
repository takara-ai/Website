import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  publicDir: false,
  build: {
    outDir: 'static/js',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        components: resolve(__dirname, 'assets/js/components/index.js'),
        global: resolve(__dirname, 'assets/js/global/index.js'),
        pages: resolve(__dirname, 'assets/js/pages/index.js')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]',
        format: 'es',
        exports: 'named'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'assets')
    }
  }
});