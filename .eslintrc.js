module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  rules: {
    'class-methods-use-this': ['off'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-restricted-globals': ['off'],
    'import/no-named-as-default': ['off'],
    'import/no-named-as-default-member': ['off'],
    'import/no-mutable-exports': ['off'],
    'import/no-amd': ['off'],
    'import/newline-after-import': ['off']
  },
  globals: {
    fetch: false,
    document: false,
    FileReader: false,
  },
  env: {
    "browser": true,
    'jest/globals': true,
  },
};
