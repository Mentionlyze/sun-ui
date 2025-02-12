import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@sunui/shared',
      fileName: 'sunui-shared',
    },
    rollupOptions: {
      external: ['lodash'],
    },
  },
})
