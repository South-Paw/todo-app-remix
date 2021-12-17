module.exports = {
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  resetMocks: true,
  setupFilesAfterEnv: ['./setupTests.ts'],
  testEnvironment: 'node',
  testMatch: ['**/__test__/**/*.spec.(ts|js)'],
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
};
