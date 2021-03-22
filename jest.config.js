module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/", 
    "./spec/test-setup.ts",
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    "**/spec/**/*.ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ]
};
