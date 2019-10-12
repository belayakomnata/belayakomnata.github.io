import gulp from 'gulp';
import consolidate from 'gulp-consolidate';
import config from '../config';
import 'require-yaml';

import del from 'del';
import rename from 'gulp-rename';

var sm = require('sitemap');
var fs = require('fs');

gulp.task('sitemap', function(done){
  var sitemap = sm.createSitemap({
    hostname: 'https://belayakomnata.me',
    cacheTime: 600000,
    urls: [
      { url: '/' , changefreq: 'weekly', priority: 1, lastmodrealtime: true, lastmodfile: 'src/templates/home.html' },
      { url: '/about', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'src/templates/about.html' },
      { url: '/music', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'src/templates/music.html' },
      { url: '/shop', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'src/templates/shop.html' },
      { url: '/contacts', changefreq: 'weekly', priority: 0.8, lastmodrealtime: true, lastmodfile: 'src/templates/contacts.html' }
    ]
  });

  sitemap.toXML( function(err, xml)
  { 
    if (err)
    { 
      console.log(err);
    } 
  });

  var xml = sitemap.toString();

  fs.writeFile("src/sitemap.xml", xml, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("Sitemap saved.");
  }); 

  done();
});

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
  ? gulp => gulp.series('list-pages', 'remove-data', 'remove-index', 'rename-home', 'remove-home', 'sitemap')
  : gulp => gulp.series('list-pages');

const watch = gulp => () => gulp.watch(config.src.root+'/*', gulp.parallel('list-pages', 'remove-data'));

module.exports.build = build;
module.exports.watch = watch;
