module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'karma-typescript'],

        // list of files / patterns to load in the browser
        files: [
            // Decorators (and tests if they are in this folder)
            { pattern: "src/**/*.ts" },  // "src/**/*.+(js|ts)"

            // Tests in its own folder. If the tests would be placed in the src folder (next to source files)
            // this line should be commented (it's enough with the previous one pattern)
            { pattern: "test/**/*.ts" }
        ],

        // list of files / patterns to exclude
        exclude: [],

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
            reports: {
                // Define a reporter to generate an XML file
                /*"cobertura": {
                    "directory": "coverage",
                    "filename": "cobertura/coverage.xml"
                },*/

                //
                'lcovonly': {
                    "directory": "coverage",
                    "subdirectory": "lcov",
                    "filename": "lcov.info"
                },

                // Define a reporter to see through console, after the test execution, a coverage summary
                'html': 'coverage',
                'text-summary': ''
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
        },

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'karma-typescript'],

        plugins: [
            "karma-typescript",
            "karma-jasmine",
            "karma-chrome-launcher",
            "karma-jasmine-html-reporter",
            "karma-spec-reporter"
        ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'ChromeHeadless'
        ],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
}