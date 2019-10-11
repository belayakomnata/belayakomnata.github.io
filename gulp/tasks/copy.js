import gulp from 'gulp';
import config from '../config.js';
// import imagemin from 'gulp-imagemin';

gulp.task('copy:img', () => gulp
  .src([
    config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
    '!' + config.src.img + '/svgo/**/*.*'
	])
	// .pipe(imagemin([], {
	// 	verbose: true
	// }))
  .pipe(gulp.dest(config.dest.img))
);

gulp.task('copy:fonts', () => gulp
  .src(config.src.fonts + '/*.{ttf,eot,woff,woff2}')
  .pipe(gulp.dest(config.dest.fonts))
);

gulp.task('copy:data', () => gulp
  .src([
    config.entry + '.gitignore', 
    config.src.root + '/CNAME', 
    config.src.root + '/favicon.ico',
    config.src.root + '/robots.txt',
    config.src.root + '/sitemap.xml',
    config.src.root + '/manifest.webmanifest',
    config.src.root + '/media/*/**'
  ])
  .pipe(gulp.dest(config.dest.root))
);

gulp.task('copy:lib', () => gulp
  .src(config.src.lib + '/**/*.*')
  .pipe(gulp.dest(config.dest.lib))
);

gulp.task('copy:rootfiles', () => gulp
  .src(config.src.root + '/*.*')
  .pipe(gulp.dest(config.dest.root))
);

gulp.task('copy:js', () => gulp
  .src(config.src.js + '/*.*')
  .pipe(gulp.dest(config.dest.js))
);

const build = gulp => gulp.series('copy:img', 'copy:fonts', 'copy:data', 'copy:js');
const watch = gulp => () => gulp.watch(config.src.img + '/*', gulp.parallel('copy:img', 'copy:fonts', 'copy:js'));

module.exports.build = build;
module.exports.watch = watch;
