module.exports = function(config) {
  config.set({
    basePath: '.',
    browserNoActivityTimeout: 10000,
    browsers: [
      process.env.TRAVIS ? 'ChromeTravis' : 'Chrome'
    ],
    files: [
      'test/**/*.js'
    ],
    frameworks: [
      'browserify',
      'tap'
    ],
    plugins: [
      'karma-browserify',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-tap',
      'karma-tape-reporter'
    ],
    preprocessors: {
      'test/**/*.js': [
        'browserify'
      ]
    },
    reporters: [
      'coverage',
      'tape'
    ],
    singleRun: true,
    // Config for `karma-browserify`.
    browserify: {
      transform: [
        'babelify',
        [
          'browserify-babel-istanbul',
          {
            ignore: [
              '**/test/**'
            ],
            defaultIgnore: false
          }
        ]
      ]
    },
    // Config for `karma-chrome-launcher`.
    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: [
          '--no-sandbox'
        ]
      }
    }
  });
};
