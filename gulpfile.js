var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins({
      rename: {
        'gulp-ruby-sass': 'sass'
      }
    }),
    pngquant = require('imagemin-pngquant'),
    browserSync = require('browser-sync');

var config = {
  bootstrapDir: './public/lib/bootstrap-sass',
  fontAwesomeDir: './public/lib/font-awesome'
};

// Init nodemon server and integrate with browser-sync
var browserSyncReloadDelay = 500;

// Set NODE_ENV to development
gulp.task('env:dev', function() {
  process.env.NODE_ENV = 'development';
});

// Build IMG
gulp.task('build:img', function() {
  return gulp.src('./public/assets/images/**/*')
    .pipe(plugins.imagemin({
      progressive: true,
      svgoPlugins: [
        { removeViewBox: false },
        { removeUselessDefs: false },
        { cleanupIDs: false }
      ],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('public/dist/img'));
});

// Build CSS
gulp.task('build:css', function() {
  return plugins.sass('./public/assets/stylesheets/*.scss', {
    style: 'compressed',
    loadPath: [
      config.bootstrapDir + '/assets/stylesheets',
      config.fontAwesomeDir + '/scss'
    ]
  })
    .on('error', plugins.sass.logError)
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest('public/dist/css'));
});

// Build Javascript
gulp.task('build:js', function() {
  return gulp.src('public/assets/javascripts/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/dist/js'));
});

gulp.task('nodemon', function(cb) {
  var called = false;

  return plugins.nodemon({

    // nodemon our expressjs server
    script: 'server.js',

    // watch core server file(s) that require server restart on change
    watch: ['server.js', 'server/**/*.js']
  })
    .on('start', function() {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function() {
      // reload connected browser after a slight delay
      setTimeout(function() {
        browserSync.reload({
          stream: false
        }, browserSyncReloadDelay);
      });
    });
});

gulp.task('build:fonts', function() {
  return gulp.src(config.fontAwesomeDir + '/fonts/*')
    .pipe(gulp.dest('./public/dist/fonts'));
});

gulp.task('sync', ['nodemon'], function() {
  // for more browser-sync config options http://www.browsersync.io/docs/options/
  browserSync({
    // informs browser-sync to proxy expressjs app which would run at the following location
    proxy: 'http://localhost:9000',

    // informs browser-sync to use the following port for the proxied app
    // notice that default port is 3000, which would clash with our expressjs
    port: 8080,

    // Don't open browser automatically
    open: false,

    // Don't notify
    notify: false
  });

  gulp.watch('server/views/**/*.html').on('change', browserSync.reload);
  gulp.watch('public/dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('public/dist/img/**/*').on('change', browserSync.reload);
  gulp.watch('public/dist/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('sync:reload', function() {
  browserSync.reload();
});

// Build assets for production
gulp.task('build', ['build:img', 'build:css', 'build:fonts', 'build:js']);

gulp.task('watch', function() {
  gulp.watch('public/assets/stylesheets/**/*.scss', ['build:css']);
  gulp.watch('public/assets/images/**/*', ['build:img']);
  gulp.watch('public/assets/javascripts/**/*.js', ['build:js']);
});

// Comment for correct buildpacks order on heroku
gulp.task('heroku:production', ['build']);

gulp.task('default', ['build', 'watch', 'sync']);
