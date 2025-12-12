import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: false, // Disable esbuild completely, use SWC instead
  build: {
    outDir: 'dist',
  },
});