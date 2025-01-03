import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',   // Allow external access
    port: 5173,         // The port Vite is running on
    strictPort: true,   // Make sure the port is not in use by another process
  },
  plugins: [react()],
})
