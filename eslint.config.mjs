import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: {
    overrides: {
      'vue/no-reserved-component-names': 'off',
      'vue/no-arrow-functions-in-watch': 'off',
    },
  },
  typescript: {
    overrides: {
      'ts/no-empty-object-type': 'off',
    },
  },
}, {
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'ts/no-unsafe-function-type': 'off',
    'ts/no-dynamic-delete': 'off',
    'node/no-callback-literal': 'off',
  },
})
