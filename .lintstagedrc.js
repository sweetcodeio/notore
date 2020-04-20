module.exports = {
  'packages/**/*.{js,ts}': [
    'yarn prettier',
    'yarn lint:fix',
    'yarn test --findRelatedTests',
  ],
};
