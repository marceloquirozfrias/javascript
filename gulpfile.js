(function () {
  'use strict';

  /* Requires */
  var gulp                = require('gulp'),
      connect             = require('gulp-connect'),
      historyApiFallback  = require('connect-history-api-fallback');

  /* TASKS */
  gulp.task('server', function() {
    connect.server({
      root: [__dirname],
      hostname: '0.0.0.0',
      port: 8082,
      livereload: true,
      middleware: function(connect, opt) {
        return [ historyApiFallback ];
      }
    });
  });

  gulp.task('default', ['server']);
})();