import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
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
