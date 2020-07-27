var
  gulp = require('gulp'),
  gulp = require('gulp'),
  handlebars = require('gulp-compile-handlebars'),
  //rename = require('gulp-rename'),
  wrap = require('gulp-wrap'),
  concat = require('gulp-concat'),
  declare = require('gulp-declare'),
  hbsPrecompiler = require('handlebars-precompiler'),
  //minify = require('minify'),
  //minify = require('gulp-minify'),
  uglify = require('gulp-uglify'),
  config = {
    'templates': {
      'src': './jasmine/backbone/',
      'dest': './jasmine/backbone/',
      'fileName': 'templates.js'
    },
    'js': {
      'basics': [
        'assets/bower_components/underscore/underscore.js',
        'assets/bower_components/jquery/dist/jquery.min.js',
        'assets/bower_components/handlebars/handlebars.min.js',
        'assets/bower_components/backbone/backbone.js',
        'assets/bower_components/marionette/lib/backbone.marionette.min.js'
      ],
      'dest': './jasmine/backbone/',
    }
  };

/*gulp.task('templates', function() {

  var
    templateData = {
    },
    options = {
    };

  return gulp.src(config.templates.src)
    .pipe(handlebars(templateData, options))
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'App.TPL',
      noRedeclare: true  // Avoid duplicate declarations
    }))
    .pipe(concat(config.templates.fileName))
    .pipe(gulp.dest(config.templates.dest));
});*/

gulp.task('basics', function() {

  return gulp.src(config.js.basics)
    .pipe(uglify())
    .pipe(concat('application.js'))
    .pipe(gulp.dest(config.js.dest));
});

gulp.task('templates', function() {

  hbsPrecompiler.watchDir(
    config.templates.src,
    config.templates.dest + "/templates.js",
    ['handlebars', 'hbs']
  );

});


gulp.task('default', ['templates']);
