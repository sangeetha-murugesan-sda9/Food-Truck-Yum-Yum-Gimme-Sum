
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/keys': {
        target: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
      '/menu': {
        target: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
      '/tenants': {
        target: 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
