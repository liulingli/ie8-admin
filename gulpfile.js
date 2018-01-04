/**
 * Created by liulingli on 2017/12/27
 * description gulp打包配置
 */

const gulp = require('gulp');
const sequence = require('gulp-sequence');
const concat = require('gulp-concat');
const gulpLess = require('gulp-less');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify');//js文件压缩
const clean = require('gulp-clean');//清除文件插件
const gulp_tpl = require('gulp-template'); //模板替换
const rename = require('gulp-rename'); //文件重命名
const webServer = require('gulp-webserver');// 启动服务
const lineReload = require('gulp-livereload'); //自动刷新
const rev = require('gulp-rev'); //文件名加MD5后缀
const revCollector = require('gulp-rev-collector');  //路径替换
const spriter = require('gulp-css-spriter'); //雪碧图
const base64 = require('gulp-css-base64'); //将小图片转成base64
const imagemin = require('gulp-imagemin'); //图片压缩
const plumber = require('gulp-plumber'); //错误处理


const isDev = process.env.NODE_ENV === 'development';

//构建输出的目录
const app = {
    distPath: 'dist/',
    devPath: 'dev/'
};

//环境配置
gulp.task('config',function(){
    gulp.src(['config.js'])
        .pipe(gulp_tpl({
            'baseUrl':isDev ? '/dev' : '/dist'
        }))
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'js'));
});

//webServer
gulp.task('webserver', function() {
    return gulp.src(app.devPath)
        .pipe(webServer({
            livereload: true,
            open: true    //服务器启动时自动打开网页
        }));
});

//删除dist目录
gulp.task('clean:dist', function (cb) {
    return gulp.src([isDev?app.devPath:app.distPath,'rev'], {read: false})
        .pipe(clean());
});

//删除dist目录
gulp.task('clean:dev', function (cb) {
    return gulp.src([isDev?app.devPath:app.distPath,'rev'], {read: false})
        .pipe(clean());
});

//打包html
gulp.task('html',function(){
    return gulp.src(['index.html','src/!font/*.html'])
        .pipe(gulp.dest(isDev?app.devPath:app.distPath))
})

//打包font
gulp.task('font',function(){
    return gulp.src('src/font/*.*')
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'font'))
})


//合并js文件并压缩并加上md5
gulp.task('uglifyjs',function(){
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(concat('build.js')) //合并成一个js
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'js')) //输出到js目录
        .pipe(uglify()) //压缩js到一行
        .pipe(concat('build.min.js')) //压缩后的js
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'js')) //输出到js目录
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+"js"))
        .pipe(rev.manifest()) // 生成一个rev-manifest.json
        .pipe(plumber.stop())
        .pipe(gulp.dest('rev/js'));
});

//less压缩
gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(plumber())
        .pipe(gulpLess())
        .pipe(concat('build.css'))
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'css')) //输出到css目录
        .pipe(spriter({
            // 生成的spriter的位置
            'spriteSheet': (isDev?app.devPath:app.distPath)+'images/sprite'+(+new Date())+'.png',
            // 生成样式文件图片引用地址的路径
            // 如下将生产：backgound:url(../images/sprite20324232.png)
            'pathToSpriteSheetFromCSS': (isDev?app.devPath:app.distPath)+'images/sprite'+(+new Date())+'.png'
        }))
        .pipe(minifyCss())
        .pipe(concat('build.min.css')) //压缩后的css
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+"css"))
        .pipe(rev())//文件名加MD5后缀
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+"css"))
        .pipe(rev.manifest()) // 生成一个rev-manifest.json
        .pipe(plumber.stop())
        .pipe(gulp.dest('rev/css'));

});

//压缩并复制图片
gulp.task('compress-img',function () {
    return gulp.src('src/images/**/*.*')
        .pipe(imagemin())//执行图片压缩
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'images'));
});

//复制第三方包
gulp.task('copy-third-party',function () {
    return gulp.src('src/lib/**/*.*')
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'lib'));
});

//复制页面组件
gulp.task('copy-html',function () {
    return gulp.src('src/componentHtml/**/*.*')
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'componentHtml'));
});

//复制登录页面组件
gulp.task('copy-user',function () {
    return gulp.src('src/user/**/*.*')
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'user'));
});

//读取 rev-manifest.json 文件以及需要进行替换的文件
gulp.task('rev', function() {
    return gulp.src(['rev/**/*.json', 'index.html'])
        .pipe(revCollector())
        .pipe(gulp.dest(isDev?app.devPath:app.distPath));
});

//开发环境打包js
gulp.task('uglifyjs-dev',function(){
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(concat('build.js')) //合并成一个js
        .pipe(gulp.dest((isDev?app.devPath:app.distPath)+'js')) //输出到js目录
        .pipe(plumber.stop())
});

//开发环境打包less
gulp.task('less-dev', function () {
    return gulp.src('src/less/*.less')
        .pipe(plumber())
        .pipe(gulpLess())
        .pipe(concat('build.css'))
        .pipe(gulp.dest((isDev ? app.devPath : app.distPath) + 'css')) //输出到css目录
})

//自动监听html文件变化
gulp.task('watchHtml',function(){
    return gulp.watch(['index.html','dev/**/*.html'],['html']) // 监听根目录下所有.html文件
});

//自动监听less文件的变化
gulp.task('watchLess',function(){
    return gulp.watch(['src/less/**/*.less'],['less-dev']);
})

//自动监听js文件的变化
gulp.task('watchJs',function(){
    return gulp.watch(['config.js','src/js/**/*.js','user/*.js'],['uglifyjs-dev']);
})

//开发环境启动
gulp.task('development',sequence('clean:dev','uglifyjs-dev','less-dev','compress-img','copy-third-party','copy-user','html','copy-html','font','config','watchHtml','watchLess','watchJs','webserver'));

//生产环境打包
gulp.task('dist',sequence('clean:dist','uglifyjs','less','rev','compress-img','copy-third-party','copy-user','html','copy-html','font','config'))