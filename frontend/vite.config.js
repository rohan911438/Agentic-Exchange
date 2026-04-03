import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // Manual Node.js polyfills to avoid Vite 8 / node-polyfills plugin deprecation warnings
      buffer: 'buffer',
      process: 'process/browser',
      stream: 'stream-browserify',
      util: 'util',
    },
  },
  define: {
    // Explicitly define global variables to avoid the deprecated esbuild banner warning
    global: 'window',
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      // Any specific esbuild legacy options can be cleared here
      define: {
        global: 'globalThis',
      },
    },
  },
})
