import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base so assets load correctly when served from public_html on Hostinger
  base: './',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Do NOT empty public_html since it contains PHP files
    emptyOutDir: false,
    // Emit build directly into public_html so you can upload as-is
    outDir: 'public_html',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          // Keep original filenames for images
          if (name.endsWith('.jpg') || 
              name.endsWith('.png') || 
              name.endsWith('.svg')) {
            return 'assets/[name][extname]';
          }
          return 'assets/[name].[hash][extname]';
        }
      }
    }
  },
});
