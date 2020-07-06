module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner:
        '/*\n' +
        ' *  <%= pkg.name %> - v<%= pkg.version %>\n' +
        ' *  <%= pkg.description %>\n' +
        ' *  <%= pkg.homepage %>\n' +
        ' *\n' +
        ' *  Made by <%= pkg.author %>\n' +
        ' *  Under <%= pkg.licenses[0].type %> License\n' +
        ' */\n',
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>',
      },
      basic: {
        src: ['lib/lena.js', 'lib/util/*.js', 'lib/filters/*.js'],
        dest: 'dist/lena.js',
      },
      extras: {
        src: [
          'demo/assets/js/vendor/jquery/*.js',
          'demo/assets/js/vendor/jquery-drag-drop-plugin/*.js',
          'demo/assets/js/vendor/nvd3/*.js',
        ],
        dest: 'demo/assets/js/vendor/all.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        src: 'dist/lena.js',
        dest: 'dist/lena.min.js',
      },
    },
    watch: {
      scripts: {
        files: ['lib/lena.js', 'lib/util/*.js', 'lib/filters/*.js', 'demo/assets/js/runner/*.js'],
        tasks: ['concat'],
        options: {
          nospawn: true,
          debounceDelay: 250,
        },
      },
    },
  })

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify')

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat')

  grunt.loadNpmTasks('grunt-contrib-watch')

  // Default task(s).
  grunt.registerTask('default', ['concat'])
}
