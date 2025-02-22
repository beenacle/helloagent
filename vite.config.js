import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Include if using React
  css: {
    postcss: './postcss.config.js', // Points to your PostCSS config
  },
});