/* global module */

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
  rules: {
    // '@typescript-eslint/ban-ts-comment': 'off',
    'vue/attribute-hyphenation': 'error',
    'no-unused-vars': 0,
    'no-undefined': 0
  }
}
