import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: {
    overrides: {
      'vue/no-reserved-component-names': 'off',
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
  },
})
