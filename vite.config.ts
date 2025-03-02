import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      "buffer": "buffer",
    },
  },
  optimizeDeps: {
    include: [
      '@near-wallet-selector/core',
      '@near-wallet-selector/modal-ui',
      '@near-wallet-selector/my-near-wallet',
      '@near-wallet-selector/sender',
      '@near-wallet-selector/meteor-wallet',
      '@near-wallet-selector/here-wallet',
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          near: [
            '@near-wallet-selector/core',
            '@near-wallet-selector/modal-ui',
            '@near-wallet-selector/my-near-wallet',
            '@near-wallet-selector/sender',
            '@near-wallet-selector/meteor-wallet',
            '@near-wallet-selector/here-wallet',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
  },
  define: {
    // Fix for process not defined
    'process.env': {},
  },
});
