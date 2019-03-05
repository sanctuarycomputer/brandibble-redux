const webpackConfig = require('./webpack.config.base');

webpackConfig.externals = {
  cheerio: 'window',
};

module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    client: {
      mocha: {
        reporter: 'html',
        timeout: `${process.env.CI ? '80000' : '50000'}`,
      },
    },
    files: [
      'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
      'tests/setup.test.js',
      'tests/**/*.test.js',
    ],
    frameworks: ['mocha', 'chai'],
    plugins: [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    preprocessors: {
      'tests/**/*.test.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    singleRun: !!process.env.CI,
    webpack: webpackConfig,
  });
};
