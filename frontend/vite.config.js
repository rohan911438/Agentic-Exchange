import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  define: {
    // Explicitly define global for libraries that expect it
    global: 'globalThis',
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
})
