// Includes
// Gulp the task runner
const gulp = require( 'gulp' );
// Compilador de Sass do Gulp
const sass = require( 'gulp-sass' );
// Minificador de CSS
const cssnano = require( 'cssnano' );
// Agrupador de media queries
const gcmq = require('gulp-group-css-media-queries');
// Autoprefixer
const autoprefixer = require('gulp-autoprefixer');
const autoprefixBrowsers = ['last 5 versions', 'firefox >= 40', 'safari 8', 'IE 10', 'IE 11'];
// CSS Minify
const cleanCSS = require('gulp-clean-css');
// Diretórios dos arquivos do projeto
const dir_css = './scss/style.scss',
      dir_css_rulled = ['./scss/*.scss','!./scss/_*.scss'],
      prod_css =  './ncss/';



// Função para compilar CSS
function compile(){
  return(
    gulp.src( dir_css_rulled  )
    .pipe( sass( {outputStyle: 'expanded', sourceComments: true } ) )
    .pipe( gcmq() )
    .pipe(autoprefixer({
        browsers: autoprefixBrowsers,
        overrideBrowserslist: autoprefixBrowsers,
        cascade: false
      }))
    .pipe( gulp.dest( prod_css ) )
  )
}

exports.compile = compile;

// Função que compile e minifica o CSS
function minify(){
  return(
    gulp.src( dir_css_rulled )
      .pipe( sass() )
      .pipe( gcmq() )
      .pipe(autoprefixer({
          browsers: autoprefixBrowsers,
          overrideBrowserslist: autoprefixBrowsers,
          cascade: false
        }))
      .pipe(cleanCSS())
      .pipe( gulp.dest( prod_css ) )
  )
};

exports.minify = minify;

// Função watch
function watch(){
  return(
    gulp.watch( dir_css , compile ).on('change', function( log, stats) {
      console.log('\x1b[37m' + log.path + '\x1b[32m -- ' + log.type );
    })
  )
};

exports.watch = watch