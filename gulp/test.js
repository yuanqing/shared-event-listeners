import del from 'del';
import gulp from 'gulp';
import karma from 'karma';
import path from 'path';
import runSequence from 'run-sequence';

gulp.task('test', (callback) => {
  runSequence(
    'test:clean',
    'test:test',
    callback
  );
});

gulp.task('test:clean', () => {
  return del('coverage');
});

gulp.task('test:test', (callback) => {
  const rootDir = path.resolve(__dirname, '..');
  new karma.Server({
    configFile: `${rootDir}/karma.conf.js`,
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [
        {
          type: 'json',
          file: 'coverage.json'
        },
        { type: 'lcov' },
        { type: 'text' }
      ]
    }
  }, callback).start();
});
