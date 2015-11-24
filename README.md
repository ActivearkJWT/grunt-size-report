# grunt-size-report

> Create size report of your project

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-size-report --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-size-report');
```

## The "size_report" task

### Overview
In your project's Gruntfile, add a section named `size_report` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    size_report: {
        your_target: {
            files: {
                list: ['path/to/*.html', 'path/to/images/*.jpg']
            },
        },
    },
})
```


### Usage Examples

#### Default behaviour

Generate a size report by adding the compiled project files to the 'list' variable:

```js
grunt.initConfig({
    size_report: {
        files: {
            list: ['path/to/*.html', 'path/to/images/*.jpg']
        },
    },
})
```

This generates a size report similar to:
```
̴̴̴̴̴̴̴̴̴̴̴
Size report
̴̴̴̴̴̴̴̴̴̴̴

Filename                      Size          %
---------------------------------------------
test/testfiles/test4.txt     9.6 KiB    46.8%
test/testfiles/test1.txt     7.0 KiB    34.0%
test/testfiles/test2.txt     3.5 KiB    17.0%
test/testfiles/test3.txt     447 B       2.1%
=============================================
Total:                      20.5 KiB
```

#### Multiple reports

Generate multiple reports by adding different targets to your Grunt config:

```js
grunt.initConfig({
    size_report: {
        images: {
            files: {
                list: ['path/to/images/*.jpg']
            },
        },
        css: {
            files: {
                list: ['path/to/css/*.css']
            },
        },
        fonts: {
            files: {
                list: ['path/to/fonts/*.woff', 'path/to/fonts/*.ttf']
            },
        },
        js: {
            files: {
                list: ['path/to/js/*.js']
            },
        },
    },
})
```


## Release History

* 0.1.1 Added sample report to README
* 0.1.0 Initial release
