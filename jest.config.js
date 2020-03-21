module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['json', 'lcov'],
  projects: ['<rootDir>/packages/*/jest.config.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'packages/**/lib/**/*.{js,ts}',
    'packages/**/lib/*.{js,ts}',
    '!**/*-test.{js,ts}',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
  moduleNameMapper: {
    '@notore/(.*)': '<rootDir>/packages/$1/lib',
  },
};
