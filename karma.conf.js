module.exports = function(config) {
    config.set({
        //basePath: "./",

        frameworks: [
            "jasmine", 
            "karma-typescript"
        ],

        plugins: [
            "karma-typescript",
            "karma-jasmine",
            "karma-mocha-reporter",
            "karma-jasmine-html-reporter",
            "karma-spec-reporter",
            "karma-chrome-launcher"
        ],

        files: [
            // Decorators (and tests if they are in this folder)
            { pattern: "src/**/*.ts" },

            // Tests in its own folder. If the tests would be placed in the src folder (next to source files)
            // this line should be commented (it's enough with the previous one pattern)
            { pattern: "test/**/*.ts" }
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        reporters: ["mocha", "karma-typescript"],  // progress, dots, coverage, html, mocha, kjhtml

        browsers: [
            //"Chrome",
            "ChromeHeadless"
        ],

        port: 9876,
        logLevel: config.LOG_INFO,
        singleRun: true,
        
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.test.json",
            include: [
                // This line is only needed if the tests are located in its own folder
                "test/**/*.spec.ts"
            ],
            coverageOptions: {
                // Exclude all .d.ts, .spec.ts and index.ts for coverage report
                exclude: [/\.(d|spec)\.ts$/i, /index\.ts$/i]
            },
            threshold: {
                // Computed over whole source code base, it means, over the total/global
                global: {
                    statements: 75,  // global statements coverage
                    branches: 70,    // global branches coverage
                    functions: -50,  // global uncovered functions coverage
                    lines: 70        // global line coverage
                },
                // Thresholds for each file
                file: {
                    statements: 75,
                    branches: 70,
                    functions: -10,
                    lines: 70,
                    overrides: {
                    // Overrides for specific files
                    'src/services/offline-manager.service.ts': {
                        statements: 60,
                        branches: 60,
                        functions: -40,
                        lines: 60
                    }
                    }
                }
            },
            reports: {
                // Define a reporter to see through console, after the test execution, a coverage summary
                'html': 'coverage',
                'text-summary': null
            }
        },

        remapIstanbulReporter: {
            reports: {
                html: 'coverage',
                lcovonly: './coverage/coverage.lcov'
            }
        }
    });
};