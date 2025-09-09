import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/'
})
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // Ensure clean URLs work
    write: true
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
