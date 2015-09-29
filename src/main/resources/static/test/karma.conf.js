module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'http://code.angularjs.org/1.3.0-beta.14/angular.js',
      '../js/angular-mocks.js',
      '../js/angular-route.js',
      '../js/ui-bootstrap-tpls-0.12.1.js',
      '../js/main.js',
      '../js/users.js',
      '../js/helper.js',
      '../js/interaction.js',
      '../js/global.js',
      '../js/perfilController.js',
      '**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch : true,

    browsers: ['Chrome'],

    singleRun: true
  });
};
