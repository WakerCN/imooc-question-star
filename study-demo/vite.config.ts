import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    modules: {
      generateScopedName: `[local]_[hash:base64:6]_[folder]`,
    },
  },
});
