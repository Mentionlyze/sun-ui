import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: '@sunui/input',
      fileName: 'sunui-input',
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
