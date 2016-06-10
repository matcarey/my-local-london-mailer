var gulp = require('gulp');

var nodemon = require('gulp-nodemon');

gulp.task('devserver', function () {
  nodemon({
    script: 'server.js',
    ext: 'js',
    env: {
      PORT: '7811',
      MLL_MAILER_WEB_SERVER: 'http://localhost:7810',
      MLL_MAILER_MAILER_SERVER: 'http://localhost:7811',
      MLL_MAILER_MYSQL_HOST: 'localhost',
      MLL_MAILER_MYSQL_PORT: '3306',
      MLL_MAILER_MYSQL_SCHEMA: 'MLL_MAILER',
      MLL_MAILER_MYSQL_PASSWORD: 'hijklm',
      MLL_MAILER_MYSQL_USERNAME: 'mll-api'
    }
  });
});

gulp.task('default', ['devserver']);
