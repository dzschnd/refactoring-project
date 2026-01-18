module.exports = {
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  testPathIgnorePatterns: ["/dist/"],
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      { useESM: true, tsconfig: "<rootDir>/tsconfig.json", diagnostics: { ignoreCodes: [151002] } },
    ],
  },
};
