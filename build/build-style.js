const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');

// 编译less
gulp.task('css', function () {
  gulp.src('../src/styles/components/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie > 8'],
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('../dist/css'));
});

// 拷贝字体文件
gulp.task('fonts', function () {
  gulp.src('../src/styles/fonts/iconfont.*')
    .pipe(gulp.dest('../dist/fonts'));
});

gulp.task('default', ['css', 'fonts']);
