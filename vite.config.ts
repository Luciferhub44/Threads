import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'public': path.resolve(__dirname, 'public')
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      external: [
        'mongoose',
        'express',
        'cors',
        'stripe',
        'bcryptjs',
        'jsonwebtoken',
        'multer',
        'cloudinary'
      ],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@stripe/stripe-js', '@stripe/react-stripe-js', 'framer-motion', 'lucide-react']
        },
        format: 'es',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/.netlify/functions/api': {
        target: 'http://localhost:8888',
        changeOrigin: true
      }
    }
  }
});