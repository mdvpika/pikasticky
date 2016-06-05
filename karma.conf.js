module.exports = function (config) {
    config.set({
        files: ['node_modules/angular/angular.js',
            'node_modules/jquery/dist/jquery.js',
            'src/components/pika-angular/pika-angular-module.js',
            'src/components/pika-sticky/pika-sticky-module.js',
            'src/**/*.js',
            'spec/**/*.js'],
        autoWatch : true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        reporters: 'progress',
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher'
        ]
    });
};