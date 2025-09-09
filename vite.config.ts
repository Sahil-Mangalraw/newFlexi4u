import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // Use absolute paths for production
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    assetsDir: 'assets',
    manifest: true, // Generate manifest for asset management
    sourcemap: false, // Disable sourcemaps in production
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
