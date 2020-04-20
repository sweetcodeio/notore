module.exports = {
  'src/**/*.js': [
    'yarn prettier',
    'yarn lint:fix',
    'yarn test --findRelatedTests',
  ],
};
