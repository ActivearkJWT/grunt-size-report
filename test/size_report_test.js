'use strict';

var grunt = require('grunt');
var sizeReport = require('../tasks/size_report')(grunt);

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.size_report = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(11);
    
    test.equal(sizeReport.padRight("test", 8, "-"), "----test", 'Padding right script');
    test.equal(sizeReport.padLeft("test", 8), "test    ", 'Padding left script');
    test.equal(sizeReport.humanReadableFilesize(1024), '1.0 KiB', 'Human-readable filesize');
    test.equal(sizeReport.humanReadableFilesize(2024*1024*1024*1024), '2.0 TiB', 'Human-readable filesize');
    
    var filepath = 'test/testfiles/test1.txt';
    test.equal(grunt.file.exists(filepath), true, 'Test file exists');
    var testObj = new sizeReport.FileSize(filepath);
    
    test.equal(testObj.size, 7152, 'Correct file size');
    test.equal(testObj.hSize, '7.0 KiB', 'Correct human-readable file size');
    
    var filepaths = ['test/testfiles/test1.txt', 'test/testfiles/test2.txt', 'test/testfiles/test3.txt'];
    var files = filepaths.map(function(filepath) {
        test.equal(grunt.file.exists(filepath), true, 'Test file exists');
        return new sizeReport.FileSize(filepath);
    });
    
    test.equal(sizeReport.averageFileSize(files), 3725, 'Correct average file size');
    
    test.done();
  },
};
