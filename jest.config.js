module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: [
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleFileExtensions: ['js', 'ts', 'json'],
  clearMocks: false,
  testTimeout: 10 * 1000,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  moduleNameMapper: {
    '~tests(.*)': '<rootDir>/tests/$1',
  },
};