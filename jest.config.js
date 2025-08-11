const config = {
  verbose: true,
  setupFilesAfterEnv: [require.resolve('regenerator-runtime/runtime')],
  testMatch: ['**/packages/amohajewellery/src/**/tests/unit/*.[jt]s?(x)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/.amohajewellery/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/core/node_modules/'
  ],
  moduleNameMapper: {
      '^axios$': require.resolve('axios')
    }
}

module.exports = config;
