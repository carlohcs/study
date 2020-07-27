# Grunt Vs Gulp (Webpack)

## Gulp - #3

[https://www.youtube.com/watch?v=gsX8Ubj2FlE](https://www.youtube.com/watch?v=gsX8Ubj2FlE)

Site: [gulpjs.com](gulpjs.com)

### Instalação

No terminal:

```
npm install -g gulp-cli // geral e linha de comando
npm install gulp --save-dev // projeto local
```

#### Verificar versão

```
gulp --version
```

### Configuração

Visualizando arquivo **Gruntfile.js**:

```
var gulp = require('gulp');

gulp.task('default', function() {

});
```

### Criando uma distribuição final

#### Criando um Workflow:

- Limpar todos arquivos deixados pelo processo da distribuição anterior
- Verificar a qualidade
- Concatenar os arquivos JS
- Minificar todos os arquivos JS já concatenados em um arquivo único
- Minificar os arquivos css
- Minificar os arquivos html
- Copiar recursos necessários
- Limpar arquivos intermediários

### Arquivo final

```
var gulp = require('gulp');
var jshint = require('jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var es = require('events-stream'); // Events
var html = require('gulp-html-min');
var cleanCss = require('gulp-clean-css');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');

gulp.task('clean', function() {
  return gulp.src('dist/')
  .pipe(clean());
});

gulp.task('jshint', function(){
  return gulp.src('js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('uglify', ['clean'], function() {
  return es.merge([
    gulp.src(['bower_components/angular/angular.min.js', 'lib/**/*.js']),
    gulp.src(['js/**/*.js', 'lib/**/*.js']).pipe(concat('scripts.js')).pipe(ugligy())
  ])
  .pipe(concat('all.min.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('htmlmin', function () {
  return gulp.src('view/*.html')
  .pipe(htmlmin({collapseWithespace: true}))
  .pipe(gulp.dest('dist/view'));
});

gulp.task('cssmin', function(){
  return gulp.src(['bower_components/bootstrap/dist/css/bootstrap.css', 'css/**/*.css'])
  .pipe(cleanCss())
  .pipe(concat('styles.min.css'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function(){
  return gulp.src('index-prod.html')
  .pipe(rename('index.html'))
  .pipe(gulp.dest('dist/'));
});

gulp.task('default', function(cb) {
  return runSequence('clean', ['jshint', 'uglify', 'htmlmin', 'cssmin', 'copy'], cb);
});
```

### DICA

#### Colocar sempre `return` nas tasks. Pois assim elas executam de modo síncrono.

#### Sem o `return`, ele executa de modo síncrono.
