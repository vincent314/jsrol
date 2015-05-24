// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'client/bower_components/jquery/dist/jquery.js',
            'client/bower_components/angular/angular.js',
            'client/bower_components/angular-mocks/angular-mocks.js',
            'client/bower_components/angular-resource/angular-resource.js',
            'client/bower_components/angular-cookies/angular-cookies.js',
            'client/bower_components/angular-sanitize/angular-sanitize.js',
            'client/bower_components/angular-route/angular-route.js',
            'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'client/bower_components/lodash/dist/lodash.compat.js',
            'client/bower_components/angular-ui-router/release/angular-ui-router.js',
            'client/bower_components/datatables/media/js/jquery.dataTables.js',
            'client/bower_components/angular-datatables/dist/angular-datatables.js',
            'client/bower_components/angularjs-mongolab/src/angular-mongolab.js',
            'client/bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js',
            'client/bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.js',
            'client/bower_components/leaflet/dist/leaflet.js',
            'client/bower_components/angular-ui-date/src/date.js',
            'client/app/app.js',
            'client/app/app.coffee',
            'client/app/**/*.js',
            'client/app/**/*.coffee',
            'client/components/**/*.js',
            'client/components/**/*.coffee',
            'client/app/**/*.jade',
            'client/components/**/*.jade',
            'client/app/**/*.html',
            'client/components/**/*.html'
        ],

        preprocessors: {
            '**/*.jade': 'ng-jade2js',
            '**/*.html': 'ng-html2js',
            '**/!(*.spec).coffee': ['coffee', 'coverage'],
            '**/*.spec.coffee': ['coffee']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'client/'
        },

        ngJade2JsPreprocessor: {
            stripPrefix: 'client/'
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        reporters: ['coverage'],

        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'output/coverage-client'
                },
                {
                    type: 'text'
                }
            ]
        }
    });
};
