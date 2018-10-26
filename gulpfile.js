const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const runSequence = require('run-sequence');
const cache = require('gulp-cache');
const inject = require('gulp-inject');
const notify = require('gulp-notify');
const del = require('del');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const ftp = require('vinyl-ftp');

const params = {
    output: 'dist',
    entry: 'app'
};

gulp.task('default', ['server']);

gulp.task('server', ['dev'], () => {

    browserSync.init({
        server: params.output
    });

    gulp.watch(`${params.entry}/**/*.html`, ['html']);
    gulp.watch(`${params.entry}/**/*.scss`, ['sass']);
    gulp.watch(`${params.entry}/**/*.js`, ['js']);
    gulp.watch(`${params.entry}/**/sprite*.svg`, ['html']);
    gulp.watch([`${params.entry}/**/*.{jpeg,jpg,png,svg}`, `!${params.entry}/**/sprite*.svg`], ['image']);


});

gulp.task('file', () => {
   gulp.src(`${params.entry}/**/*.{pdf,php,txt,xml}`)
       .pipe(rename({
           dirname: ''
       }))
       .pipe(gulp.dest(`${params.output}`));
});

gulp.task('dev', ['removedist', 'html', 'sass', 'image', 'js', 'file']);

gulp.task('prod', ['dev'], () => {

    gulp.src(`${params.output}/css/style.css`)
        .pipe(postcss([
            autoprefixer({ browsers: ['last 10 versions'] }),
            cssnano({
                discardComments: { removeAll: true }
            })
        ]))
        .pipe(gulp.dest(`${params.output}/css`));

    gulp.src(`${params.output}/js/scripts.js`)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(`${params.output}/js`));

    gulp.src(`${params.output}/img/*`)
        .pipe(gulp.dest(`${params.output}/img/`));

});

gulp.task('html', () => {

    const svgs = gulp
        .src([`${params.entry}/**/sprite*.svg`])
        .pipe(svgmin())
        .pipe(svgstore({ inlineSvg: true }));

    const fileContents  = (filePath, file) => {
        return file.contents.toString();
    };

    gulp.src(`${params.entry}/**/*.html`)
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(params.output))
        .pipe(reload({ stream: true }));

});

gulp.task('sass', () => {

    gulp.src([
        `${params.entry}/scss/all.scss`,
        `${params.entry}/common.blocks/**/*.scss`,
        `${params.entry}/pages/**/*.scss`
    ])
        .pipe(sass().on('error', notify.onError()))
        .pipe(concat('style.css'))
        .pipe(postcss([
            autoprefixer({ browsers: ['last 2 versions'] }),
            cssnano({
                discardComments: { removeAll: true }
            })
        ]))
        .pipe(gulp.dest(`${params.output}/css`))
        .pipe(reload({ stream: true }));

});

gulp.task('image', () => {

    gulp.src([`${params.entry}/**/*.{jpeg,jpg,png,svg}`, `!${params.entry}/**/sprite*.svg`])
        .pipe(cache(imagemin()))
        .pipe(rename({
            dirname: ''
        }))
        .pipe(gulp.dest(`${params.output}/img/`));

});

gulp.task('js', () => {

    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/jquery-mask-plugin/dist/jquery.mask.js',
        `${params.entry}/**/*.js`
    ])
        .pipe(concat('scripts.js')).on('error', notify.onError())
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest(`${params.output}/js`))
        .pipe(reload({ stream: true }));

});

gulp.task('deploy', () => {

    const conn = ftp.create({
        host:      '31.31.196.78',
        user:      'u0543994',
        password:  '0vW!ENqS',
        parallel:  10
    });

    const globs = [
        'dist/**',
        // 'dist/.htaccess'
    ];

    return gulp.src(globs, { buffer: false })
        .pipe(conn.dest('/www/perviygroup.ru'));

});

gulp.task('removedist', () => {
    del.sync(`${params.output}`);
});