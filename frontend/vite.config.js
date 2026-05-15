import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      buffer: 'buffer',
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  define: {
    // Standard polyfill for libraries expecting Node globals
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'algosdk'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('algosdk') || id.includes('buffer') || id.includes('process')) {
              return 'vendor-algorand';
            }
            if (id.includes('framer-motion') || id.includes('lucide-react') || id.includes('react-markdown')) {
              return 'vendor-utils';
            }
            return 'vendor';
          }
        },
      },
    },
  },
  // Suppress build noise
  logLevel: 'info',
})
