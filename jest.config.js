module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\.ts?$': ['ts-jest',{}],
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  setupFiles: ['<rootDir>/jest.setup.js']
}
