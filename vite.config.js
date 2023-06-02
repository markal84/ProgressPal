import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/workouts': {
        target: 'https://gymapp-backend-52y9.onrender.com',
        secure: true,
        changeOrigin: true
      },
      '/api/login': {
        target: 'https://gymapp-backend-52y9.onrender.com',
        secure: true,
        changeOrigin: true
      },
      '/api/users': {
        target: 'https://gymapp-backend-52y9.onrender.com',
        secure: true,
        changeOrigin: true
      }
    }
  },
  plugins: [react(), eslint()],
  test: {
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['node_modules/', './src/tests']
    },
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    testMatch: ['./src/tests/**/*.test.jsx'],
    globals: true
  }
})

/*
      '/api/workouts': {
        target: 'https://gymapp-backend-52y9.onrender.com',
        secure: true,
        changeOrigin: true
      },
      '/api/login': {
        target: 'https://gymapp-backend-52y9.onrender.com',
        secure: true,
        changeOrigin: true
      },
      '/api/users': {
        target: 'https://gymapp-backend-52y9.onrender.com',
        secure: true,
        changeOrigin: true
      }
*/

/*
 '/api/workouts': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/api/login': {
        target: 'http://localhost:3001',
        secure: false
      },
      '/api/users': {
        target: 'http://localhost:3001',
        secure: false
      }
*/
