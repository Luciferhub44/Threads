import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      'public': resolve(__dirname, './public')
    }
  },
  build: {
    sourcemap: false,
    minify: 'terser',
    cssMinify: true,
    target: 'esnext',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          payment: ['@stripe/stripe-js', '@stripe/react-stripe-js'],
          paypal: ['@paypal/react-paypal-js'],
          icons: ['lucide-react']
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@stripe/stripe-js']
  },
  server: {
    port: 5173,
    strictPort: true
  }
});
