import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },

  test: {
    globals: true,

    environment: 'jsdom',

    setupFiles: ['./tests/setup.js'],
    
    include: ['tests/unit/**/*.test.js', 'tests/unit/**/*.spec.js'],

    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', 'vite.config.js', 'vitest.config.js']
    }
  }
})