import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'SunUI',
      fileName: 'sunui',
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
