module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {'./dist/splendid.raw.css': './scss/splendid.scss'}
            }
        },
        postcss: {
            options: {
                // map: true,
                processors: [
                    require('autoprefixer')({
                        // browsers: '> 1%, last 2 versions, Firefox ESR'
                    }),
                    require('cssnano')()
                ]
            },
            dist: {
                src: './dist/splendid.raw.css',
                dest: './dist/splendid.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            sass: {
                files: './scss/**/*.scss',
                tasks: ['dist']
            }
        },
        'gh-pages': {
            options: {
                base: 'dist'
            },
            src: ['**']
        },
        connect: {
            server: {
                options: {
                    port: 3000,
                    base: 'dist',
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['sass', 'postcss', 'connect', 'watch']);
    grunt.registerTask('dist', ['sass', 'postcss']);
};