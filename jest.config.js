module.exports = {
    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],
    modulePaths: ["<rootDir>/", "<rootDir>/src/", "<rootDir>/src/components"],
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
  
    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
      "@testing-library/jest-dom/extend-expect"
    ],
  
    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  
    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },

    moduleDirectories: ["node_modules", 'src'],
    verbose: true,
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
        "^components/(.*)$": "<rootDir>/src/components/$1",
        '^d3$': '<rootDir>/node_modules/d3/dist/d3.min.js',
        '.(css|less|scss)$': '<rootDir>/src/utils/tests/styleMock.ts'
    },
    preset: "ts-jest",
    testEnvironment: "jsdom"
};

