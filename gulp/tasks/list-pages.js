import gulp from 'gulp';
import consolidate from 'gulp-consolidate';
import config from '../config';
import 'require-yaml';

import del from 'del';
import rename from 'gulp-rename';

gulp.task('remove-data', function(done){
  return del([config.dest.data + '/**']);
  done();
});

gulp.task('remove-index', function(done){
  return del([config.dest.root + '/index.html']);
  done();
});

gulp.task('remove-home', function(done){
  return del([config.dest.root + '/home.html']);
  done();
});

gulp.task('rename-home', function(done) {
  gulp.src([config.dest.root + '/home.html'], { base: process.cwd() })
  .pipe(rename('index.html'))
  .pipe(gulp.dest(config.dest.root));
  done();
});

gulp.task('list-pages', function() {
  delete require.cache[require.resolve('../../' + config.src.pagelist)]
    const pages = require('../../' + config.src.pagelist);
    return gulp
      .src(__dirname + '/index/index.html')
      .pipe(consolidate('lodash', {
        pages: pages
      }))
      .pipe(gulp.dest(config.dest.html));
});

const build = config.production 
  ? gulp => gulp.series('list-pages', 'remove-data', 'remove-index', 'rename-home', 'remove-home')
  : gulp => gulp.series('list-pages');

const watch = gulp => () => gulp.watch(config.src.root+'/*', gulp.parallel('list-pages', 'remove-data'));

module.exports.build = build;
module.exports.watch = watch;
