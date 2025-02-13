import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: '@sunui/button',
      fileName: 'sunui-button',
    },
    rollupOptions: {
      external: [/@sunui.*/, 'vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
