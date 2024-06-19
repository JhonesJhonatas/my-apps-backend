export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { config: './ts-jest.config.json' }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  coverageReporters: ['json', 'html', 'text'],
  setupFiles: ['./src/shared/tests/@setup/index.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@user/(.*)$': '<rootDir>/src/modules/user/$1',
    '^@notification/(.*)$': '<rootDir>/src/modules/notification/$1',
    '^@transaction/(.*)$': '<rootDir>/src/modules/transaction/$1',
  },
}
