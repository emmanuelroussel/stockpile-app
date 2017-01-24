// Karma configuration
// Generated on Tue Jan 24 2017 12:22:50 GMT-0500 (EST)

module.exports = function(config) {
  var configuration = {
    basePath: '',
    frameworks: ['jasmine', 'angular-cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-remap-istanbul'),
      require('karma-mocha-reporter'),
      require('angular-cli/plugins/karma')
    ],
    files: [
      { pattern: './src/test.ts', watched: false }
    ],
    preprocessors: {
      './src/test.ts': ['angular-cli']
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage',
        lcovonly: './coverage/coverage.lcov'
      }
    },
    angularCli: {
      config: './angular-cli.json',
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
              ? ['mocha', 'karma-remap-istanbul']
              : ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  };

  if(process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
}
