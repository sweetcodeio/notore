module.exports = {
  'packages/**/*.{js,ts}': [
    'yarn lint:fix',
    'yarn test --findRelatedTests',
  ],
};
