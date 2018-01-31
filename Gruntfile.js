module.exports = function (grunt) {
	// var autoprefixer = require('autoprefixer-core');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		pug: {
			build: {
				options: {
					pretty: true,
					namespace: "html.templates",
				},
				files: {
					// для pug-файлов использую расширение .jade
					// что бы открывалась JADE подсветка в редакторе.
					"index.html": "src/pug/index.jade",
					"fw-grid.html": "src/pug/fw-grid.jade",
					"fw-forms.html": "src/pug/fw-forms.jade",
				}
			}
		},

		stylus: {
			main: {
				files: {
            		'css/main.css': 'src/styl/main.styl',
				},
				options: {
					compress: false,
				}
			}
		},

		jshint: {
			options: {
				reporter: require('jshint-stylish'),
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: "nofunc", //true
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				globals: {
					ymaps: true,
					device: true,
					jQuery: true,
					$: true,
					console: true
				},
			},
			'<%= pkg.name %>': {
				src: ['src/js/**/*.js']
			}
		},

		uglify: {
			my_target: {
				files: {
					'js/core.min.js': ['src/js/menu.js']
				}	
			}

		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({
						browsers: [
							'Android 2.3',
							'Android >= 4',
							'Chrome >= 20',
							'Firefox >= 24',
							'Explorer >= 8',
							'iOS >= 6',
							'Opera >= 12',
							'Safari >= 6'
						]
					})
				]		
			},
			dist: {
				src: 'css/main.css',
			}
		},

		watch: {
			scripts: {
				files: ['src/js/menu.js'],
				tasks: ['jshint', 'uglify'],
			},
			styl: {
				files: ['src/styl/**/*.styl'],
				tasks: ['stylus', 'postcss:dist']
			},
			pug: {
				files: ['src/pug/**/*.jade'],
				tasks: ['pug']
			}	
		},
		
	});

	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
}