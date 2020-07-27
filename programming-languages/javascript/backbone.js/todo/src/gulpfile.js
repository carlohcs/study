var
  gulp = require('gulp'),
  watch = require('gulp-watch'),
  batch = require('gulp-batch'),
  handlebars = require('gulp-compile-handlebars'),
  less = require('gulp-less'),
  sourcemaps = require('gulp-sourcemaps'),
  wrap = require('gulp-wrap'),
  concat = require('gulp-concat'),
  declare = require('gulp-declare'),
  hbsPrecompiler = require('handlebars-precompiler'),
  browsersync = require('browser-sync').create(),
  es = require('event-stream'), // Events
  jshint = require('gulp-jshint'), // jshint
  runSequence = require('run-sequence'),
  //minify = require('minify'),
  //minify = require('gulp-minify'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify'),
  config = {
    templates: {
      src: './js/component/',
      dest: './js/',
      fileName: 'templates.js'
    },
    styles: {
      less: {
        src: './less/',
        dest: './less/'
      },
      css: {
        dest: './css',
        sourcemaps: './sourcemaps'
      }
    },
    scripts: {
      src: './js/component/',
      dest: './js/',
      dependencies: {
        // Don't need to be minified
        scripts: [
          './node_modules/jquery/dist/jquery.min.js',
          './node_modules/backbone/node_modules/underscore/underscore-min.js',
          './node_modules/backbone/backbone-min.js',
          './node_modules/backbone.marionette/lib/backbone.marionette.min.js',
          './node_modules/backbone.localstorage/backbone.localStorage-min.js',
          './node_modules/handlebars/dist/handlebars.min.js'
        ]
      },
      sourcemaps: '../sourcemaps'
    },
    watch: {
      js: './js/**/*.js',
      css: './css/**/*.less'
    }
  };

gulp.task('clean:scripts', function() {
  return gulp.src(
    [
      // './dependencies.js',
      // './scripts.js',
      './js/application.js',
      '../sourcemaps/scripts.js.map'
    ]
  )
  .pipe(clean({
    read: false,
    force: true
  }));
});

// Dependências
gulp.task('build:scripts:dependencies', function() {
  return gulp.src(config.scripts.dependencies.scripts)
    .pipe(concat('app-dependencies.js'))
    .pipe(gulp.dest('./js/'));
});

// Scripts
gulp.task('build:scripts', ['clean:scripts'], function() {
  // Sourcemaps
  return gulp.src(
    [
      './js/templates.js',
      './js/app.js',
      config.scripts.src + '**/*.js'
    ]) // app scripts
    .pipe(sourcemaps.init())
      .pipe(concat('application.js'))
      .pipe(uglify())
      // .pipe(jshint())
    .pipe(sourcemaps.write(config.scripts.sourcemaps))
    .pipe(gulp.dest(config.scripts.dest));
});
//
// gulp.task('merge:scripts', ['build:scripts'], function() {
//   // Merge
//    return gulp.src([
//      './dependencies.js', // app dependencies
//      './scripts.js' // app scripts
//    ])
//   .pipe(concat('application.js'))
//   .pipe(gulp.dest(config.scripts.dest));
// });

gulp.task('clear:scripts:after', function() {
  return gulp.src(
    [
      './dependencies.js',
      './scripts.js'
    ]
  )
  .pipe(clean({
    read: false,
    force: true
  }));

});

// gulp.task('scripts', ['build:scripts'], function(cb) {
//   return runSequence('clear:scripts:after', cb);
// });
//
gulp.task('scripts', ['build:scripts'], function(cb) {
  return cb;
});

// gulp.task('scripts', function(cb) {
//   return runSequence(['clean:scripts', 'build:scripts:maps', 'merge:scripts'], cb);
// });

// Reload the pages that use this scripts
// gulp.task('scripts-watch', ['scripts'], browsersync.reload);

// Serve files form the root of this project
// gulp.task('serve', ['scripts'], function() {
//   browsersync.init({
//     server: {
//       baseDir: '../'
//     }
//   });
//
//   watch(config.watch.js, ['scripts-watch']);
// });

gulp.task('styles', function() {

  gulp.src(config.styles.less.src + '**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write(config.styles.css.sourcemaps))
    .pipe(gulp.dest(config.styles.css.dest));
});

gulp.task('templates', function() {

  hbsPrecompiler.watchDir(
    config.templates.src,
    config.templates.dest + config.templates.fileName, ['handlebars', 'hbs']
  );

});

gulp.task('watch', function() {
  // Scripts
  //watch(config.templates.src + '**/*.hbs', ['templates']);
  gulp.watch(config.watch.js, ['scripts']);
  gulp.watch(config.watch.css, ['styles']);
});


gulp.task('default', ['templates']);
