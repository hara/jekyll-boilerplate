'use strict';

module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  var paths = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({

    paths: paths,

    // grunt-contrib-watch
    watch: {
      compass: {
        files: [
          '<%= paths.app %>/_scss/**/*.{sass,scss}'
        ],
        tasks: ['compass:server']
      },
      jekyll: {
        files: [
          '<%= paths.app %>/**/*.{html,yml,md,mkd,markdown}',
          '_config.yml',
          '!<%= paths.app %>/_bower_components'
        ],
        tasks: ['jekyll:server']
      }
    },

    // grunt-contrib-connect
    connect: {
      options: {
        port: 5000,
        hostname: 'localhost'
      },
      dist: {
        options: {
          open: true,
          base: ['<%= paths.dist %>']
        }
      },
      server: {
        options: {
          open: true,
          base: [
            '.tmp',
            '.jekyll',
            '<%= paths.app %>'
          ]
        }
      }
    },

    // grunt-contrib-clean
    clean: {
      dist: {
        dot: true,
        src: [
          '.tmp',
          '<%= paths.dist %>/*',
          '!<%= paths.dist %>/.git*'
        ]
      },
      server: [
        '.tmp',
        '.jekyll'
      ]
    },

    // grunt-contrib-compass
    compass: {
      options: {
        bundleExec: true,
        sassDir: '<%= paths.app %>/_scss',
        cssDir: '.tmp/css'
      },
      dist: {},
      server: {
        options: {
          cssDir: '.tmp/css'
        }
      }
    },

    // grunt-contrib-copy
    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= paths.app %>',
            src: ['fonts/**/*', 'img/**/*'],
            dest: '<%= paths.dist %>/'
          }
        ]
      }
    },

    // grunt-jekyll
    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        src: '<%= paths.app %>'
      },
      server: {
        options: {
          dest: '.jekyll'
        }
      },
      dist: {
        options: {
          config: '_config.yml,_config.build.yml',
          dest: '<%= paths.dist %>'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    // grunt-contrib-jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      check: ['Gruntfile.js', '<%= paths.app %>/js/**/*.js']
    },

    // grunt-rev
    rev: {
      dist: {
        files: {
          src: [
            '<%= paths.dist %>/js/**/*.js',
            '<%= paths.dist %>/css/**/*.css',
            '<%= paths.dist %>/img/**/*.{gif,jpg,jpeg,png,svg,webp}',
            '<%= paths.dist %>/fonts/**/*.{eot,otf,svg,svgz,ttf,woff}'
          ]
        }
      }
    },

    // grunt-usemin
    useminPrepare: {
      html: '<%= paths.dist %>/index.html',
      options: {
        dest: '<%= paths.dist %>'
      }
    },
    usemin: {
      html: ['<%= paths.dist %>/**/*.html'],
      css: ['<%= paths.dist %>/css/**/*.css'],
      options: {
        dirs: ['<%= paths.dist %>/**/*'],
        basedir: '<%= paths.dist %>'
      }
    },
    concat: {},
    uglify: {},

    concurrent: {
      server: [
        'compass:server',
        'jekyll:server'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    }
  });

  grunt.registerTask('check', 'Check HTML/JS syntax', [
    'jekyll:check',
    'jshint:check'
  ]);

  grunt.registerTask('build', 'Build for deployment', [
    'clean:dist',
    'jekyll:dist',
    'concurrent:dist',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('server', 'Build and preview on built-in server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'connect:server',
      'watch'
    ]);
  });

  grunt.registerTask('default', [
    'check',
    'build'
  ]);
};
