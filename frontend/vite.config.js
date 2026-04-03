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
    // Explicitly inject globals at the transformer-level for Vite 8/Oxc compatibility
    global: 'globalThis',
    'globalThis.Buffer': 'Buffer',
    Buffer: 'Buffer',
    'process.env': '{}',
    'process.browser': 'true',
    process: 'process',
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'algosdk'],
  },
})
