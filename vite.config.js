import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "esbuild", // Use ESBuild for minification (default)
    sourcemap: false,  // Disable source maps for a smaller build
    target: "esnext",  // Use the latest JavaScript version
    cssCodeSplit: true, // Optimize CSS
  },
  server: {
    port: 3001,
    host: true
  }
})
