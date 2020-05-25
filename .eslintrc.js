module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  rules: {
    'class-methods-use-this': ['off'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
  },
  globals: {
    fetch: false,
    document: false,
    FileReader: false,
  },
  env: {
    'jest/globals': true,
  },
};
