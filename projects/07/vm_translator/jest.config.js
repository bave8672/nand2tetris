module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts", "!test/**/*"],
    testPathIgnorePatterns: ["/node_modules/", "/.build/"],
    verbose: true,
};
