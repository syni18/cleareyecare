import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1/api": {
        target: import.meta.env.VITE_SERVER_URL, // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
