'use strict';

const gulp = require('gulp');

function lazyRequireTask(taskName, path, options) {
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('styles', './gulp-tasks/styles.js', {
  src: 'frontend/styles/main.scss',
  since: 'styles'
});

lazyRequireTask('clean', './gulp-tasks/clean.js', {
  dst: 'public'
});

lazyRequireTask('assets', './gulp-tasks/assets.js', {
  src: 'frontend/assets/**',
  since: 'assets',
  dst: 'public'
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets')));

gulp.task('watch', function() {
  gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

lazyRequireTask('serve', './gulp-tasks/serve.js', {
  server: 'public'
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));