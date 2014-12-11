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
        }
    });

    grunt.registerTask('default', ['less', 'watch']);
};