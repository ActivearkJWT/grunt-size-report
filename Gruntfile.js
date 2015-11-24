/*
 * grunt-size-report
 * -
 *
 * Copyright (c) 2013 Jesse Luoto / Activeark JWT
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
        all: [
            'Gruntfile.js',
            'tasks/*.js',
            '<%= nodeunit.tests %>',
        ],
        options: {
            jshintrc: '.jshintrc',
        },
    },

    // Configuration to be run (and then tested).
    size_report: {
        default: {
            options: {
                header: 'Size report of .txt files'
            },
            files: {
                list: ['test/testfiles/*.txt']
            },
        },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Run tests
  grunt.registerTask('test', ['size_report', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
