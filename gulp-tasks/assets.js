'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const multipipe = require('multipipe');

module.exports = function(options) {
  return function() {
    return multipipe(
      gulp.src(options.from, {since: gulp.lastRun('assets')}),
      $.newer('public'),
      gulp.dest('public')
    ).on('error', $.notify.onError());
  };
};