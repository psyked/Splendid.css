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
            sass: {
                files: './scss/**/*.scss',
                tasks: ['dist']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'postcss']);
    grunt.registerTask('dist', ['sass', 'postcss']);
};