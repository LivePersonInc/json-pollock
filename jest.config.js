/** @type {import('jest').Config} */
module.exports = {
  globals: {
    __DEV__: true,
    TEST: 'true',
  },
  setupFilesAfterEnv: ['./test/setup.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: { resources: 'usable' },
  moduleFileExtensions: ['js', 'json'],
  moduleDirectories: ['./node_modules/', './src/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: ['./node_modules/', '<rootDir>/dist/'],
  collectCoverageFrom: ['./src/**/*.js'],
  roots: ['<rootDir>/src/', '<rootDir>/test/'],
  testMatch: ['**/test/*.spec.js'],
};
