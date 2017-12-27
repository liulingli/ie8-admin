/**
 * Created by liulingli on 2017/12/27
 * description gulp打包配置
 */

const gulp = require('gulp');
const concat = require('gulp-concat');
const gulpLess = require('gulp-less');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');//js文件压缩
const clean = require('gulp-clean');//清除文件插件
const gulp_tpl = require('gulp-template'); //模板替换
const rename = require('gulp-rename'); //文件重命名
const webServer = require('gulp-webserver');// 启动服务
const lineReload = require('gulp-livereload'); //自动刷新

//构建输出的目录
const app = {
    distPath: 'dist/',
    devPath: './'
};

//webServer
gulp.task('webserver', function() {
    gulp.src(app.devPath)
        .pipe(webServer({
            livereload: true,
            open: true    //服务器启动时自动打开网页
        }));
});

//删除dist目录
gulp.task('clean:dist', function (cb) {
    return gulp.src(app.devPath, {read: false})
        .pipe(clean());
});

gulp.task('html',function(){
    gulp.src(['index.html','login.html','src/**/*.html'])
        .pipe(gulp.dest(app.devPath))
})

//自动监听文件变化
gulp.task('watch',function(){
    gulp.watch(['index.html','login.html','src/**/*.html'],['html']) // 监听根目录下所有.html文件
});

//默认任务
gulp.task('default',['html','watch','webserver']);