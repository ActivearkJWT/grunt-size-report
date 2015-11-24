/*
 * grunt-size-report
 * -
 *
 * Copyright (c) 2013 Jesse Luoto / Activeark JWT
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    
    // Init ShellJS
    var fs = require('fs');
    var path = require('path');
    var util = require('util');
    
    function FileSize(filePath) {
        this.relativePath = filePath;
        this.absolutePath = path.resolve(filePath);
        this.size = fs.statSync(this.absolutePath).size;
        this.hSize = humanReadableFilesize(this.size);
    }
    
    var sizeArr = [
        "B  ", // padded
        "KiB",
        "MiB",
        "GiB",
        "TiB",
        "PiB",
        "EiB",
        "ZiB",
        "YiB"
    ];
    
    function humanReadableFilesize(size) {
        var currSize = size;
        var pow = 0;
        while(currSize > 762) { // more than ~0.7
            pow++;
            currSize = size / (Math.pow(1024, pow) || 1);
        }
        if(pow > 0) {
            currSize = currSize.toFixed(1);
        }
        return currSize + " " + sizeArr[pow];
    }
    
    function padRight(string, width, padding) {
        if(typeof(padding) === "undefined") {
            padding = " "; // default
        }
        return (width <= string.length) ? string : padRight(padding + string, width, padding);
    }
    function padLeft(string, width, padding) {
        if(typeof(padding) === "undefined") {
            padding = " "; // default
        }
        return (width <= string.length) ? string : padLeft(string + padding, width, padding);
    }
    
    grunt.registerMultiTask('size_report', 'Create size report of your project', function() {
        
        
        
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            // TODO: human-readable on/off
            'header': 'Size report'
        });
        
        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            
            // Generate FileSize objects
            var fileSizes = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function(file) {
                return new FileSize(file);
            });
            
            
            // Calculate statistics
            var total = 0;
            var longestPathLength = 0;
            fileSizes.forEach(function(f) {
                total += f.size;
                longestPathLength = Math.max(longestPathLength, f.relativePath.length);
            });
            
            fileSizes.sort(function(a,b) {
                return b.size - a.size;
            });
            
            // Generate report
            
            // Header
            grunt.log.writeln();
            grunt.log.write(padLeft("", options.header.length, "~"));
            grunt.log.subhead(options.header);
            grunt.log.writeln(padLeft("", options.header.length, "~"));
            
            // Size table
            grunt.log.subhead(padLeft("Filename", longestPathLength + 6) + "Size" + padRight("%", 11));
            grunt.log.writeln(grunt.log.wordlist([padLeft("", longestPathLength + 21, "-")], {color: 'grey'}));
            fileSizes.forEach(function(f){
                //grunt.log.writeln(grunt.log.wordlist(['\nWarning: ' + result.output], {color: 'yellow'}));
                grunt.log.writeln(util.format("%s   %s   %s",
                    padLeft(f.relativePath, longestPathLength),
                    padRight(f.hSize, 9),
                    padRight((f.size / total * 100).toFixed(1) + "%", 6)
                ));
            });
            grunt.log.write(grunt.log.wordlist([padLeft("", longestPathLength + 21, "=")], {color: 'grey'}));
            grunt.log.subhead("Total: " + padRight(humanReadableFilesize(total), longestPathLength + 5));
        });
    });
    
    // Return testable functions
    return {
        'FileSize': FileSize,
        'humanReadableFilesize': humanReadableFilesize,
        'padRight': padRight,
        'padLeft': padLeft
    };
    
};
