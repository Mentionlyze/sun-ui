import { join } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^@sunui\/(.+)$/,
        replacement: join(__dirname, '..', 'packages', '$1', 'dist'),
      },
    ],
  },
})
