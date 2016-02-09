import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', () => {
  const files = [
    __filename,
    'gulp/**/*.js',
    'src/**/*.js'
  ];
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
