export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    '^@amohajewellery/postgres-query-builder$': '<rootDir>/packages/postgres-query-builder/src/index.ts',
    '^@amohajewellery/postgres-query-builder/(.*)$': '<rootDir>/packages/postgres-query-builder/src/$1',
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
    "^.+\\.jsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(@amohajewellery)/)"
  ],
  testMatch: ["**/src/**/tests/**/unit/**/*.test.[jt]s"],
  modulePathIgnorePatterns: ["<rootDir>/packages/amohajewellery/dist/"]
};
