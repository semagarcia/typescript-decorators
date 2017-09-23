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
            //"karma-mocha-reporter",
            //"karma-jasmine-html-reporter",
            //"karma-spec-reporter",
            //"karma-remap-istanbul",
            "karma-chrome-launcher"
        ],

        files: [
            // Decorators
            { pattern: "src/**/*.ts" },

            // Tests
            //{ pattern: "test/**/*.ts" },
            //{ pattern: "test/logger.spec.ts" },
            //{ pattern: "src/class-decorators/logger.spec.ts" }
            //{ pattern: "src/**/*.+(js|ts)" }
            //{ pattern: "src/**/*.js" },
            //{ pattern: "test/**/*.js" },
        ],

        preprocessors: {
            "**/*.ts": ["karma-typescript"]
            //"src/**/*.ts": ["karma-typescript"],
            //"test/**/*.ts": ["karma-typescript"],
            //"src/**/*.+(js|ts)": ["karma-typescript"],
            //"src/**/*.js": ["karma-typescript"],
            //"test/**/*.js": ["karma-typescript"]
        },

        reporters: ["progress", "karma-typescript"],  // dots

        browsers: [
            "Chrome",
            //"ChromeHeadless"
        ],

        logLevel: config.LOG_INFO,
        singleRun: true,
        
        karmaTypescriptConfig: {
            /*transformPath: function(filepath) {
                console.log('-----> ', filepath);
                return filepath.replace(/\.(ts|tsx)$/, ".js");
            },*/
            /*bundlerOptions: {
                entrypoints: /\*.spec\.ts$/,
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
                sourceMap: true,
                transforms: [
                    require('karma-typescript-es6-transform')()
                ]
            },*/
            /*compilerOptions: {
                allowJs: true,
                lib: ['es2016', 'dom'],
                module: 'commonjs',
            },*/
            /*include: [

            ]*/
            include: ["src/**/*.spec.ts"],
            tsconfig: "./tsconfig.test.json"
        }
    });
};