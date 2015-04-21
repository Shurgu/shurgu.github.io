module.exports = function (grunt) {
    'use strict';

    require('matchdep').filterDev('grunt-!(cli)').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        less: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'css/main.css.map',
                    sourceMapBasepath: 'css/',
                    compress: true
                },
                files: {
                    'css/main.css': 'css/main.less'
                }
            }
        },
        watch: {
            all: {
                files: ['css/**/*.less'],
                tasks: ['less'],
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/*.js', 'js/project*/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    Backbone: true,
                    _: true,
                    'describe': false,
                    'it': false,
                    'before': false,
                    'beforeEach': false,
                    'after': false,
                    'afterEach': false,
                    'expect': false
                },
                camelcase: true, // variable naming convention UPPER_CASE for constants are allowed
                newcap: true, // All constructor function names must be capitalized
                curly: true, // curly braces must be used at all times i.e. if (...) doStuff() not allowed
                eqeqeq: true, // triple equality i.e.: ===
                forin: true, // for (... in ...) must filter properties with hasOwnProp or similar
                immed: true, // IIFEs must be wraped inside parens
                indent: 4, // 4 spaces indent
                quotmark: 'single', // only single quotes are allowed to specify strings
                unused: 'vars', // allows to clean up code throwing errors when there are unused variables
                maxparams: 3, // maxmimum number of arguments that a function can accept
                browser: true,
                eqnull: true,
                jquery: true,
                latedef: true,
                node: true,
                trailing: true,
                undef: true
            }
        },
        jasmine: {
            src: 'js/project*/*.js',
            options: {
                specs: 'js/project*/specs/*Spec.js',
                helpers: ['js/project*/specs/*Helper.js', 'js/vendor/jquery*.min.js']
            }
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
};