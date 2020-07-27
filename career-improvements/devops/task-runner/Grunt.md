# Grunt Vs Gulp (Webpack)

## Grunt - #2

[https://www.youtube.com/watch?v=VCwNHGkLXcc](https://www.youtube.com/watch?v=VCwNHGkLXcc)

Site: [gruntjs.com](gruntjs.com)

### Instalação

No terminal:

```
npm install -g grunt-cli // geral e linha de comando
npm install grunt --save-dev // projeto local
```

#### Verificar versão

```
grunt --version
```

### Configuração

Visualizando arquivo **Gruntfile.js**:

```
module.exports = function(grunt) {

  // Configurações de plugins
  grunt.initConfig({

  });

  // Tarefas
  grunt.registerTask('default', []);
};
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


#### Plugins

- grunt-contrib-jshint
- grunt-contrib-concat
- grunt-contrib-uglify
- grunt-contrib-cssmin
- grunt-contrib-htmlmin
- grunt-contrib-clean
- grunt-contrib-copy



### Arquivo final

```javascript
module.exports = function(grunt) {

  // Configurações de plugins
  grunt.initConfig({
    clean: {
      temp: ['dist/js/libs.js', 'dist/js/libs.min.js', 'dist/js/scripts.min.js'],
      all: ['dist/']
    }
    jshint: {
      dist: {
        src: ['js/**/*.js']
      }
    },
    concat: {
      dist: {
        src: [
          'js/**/*.js',
          'lib/**/*.js'
        ],
        dest: 'dist/js/scripts.js'
      },
      libs: {
        src:[
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js',
        'bower_components/angular-messages/angular-messages.min.js'
        ],
        dest: 'dist/js/libs.js'
      },
      all: {
        src: ['dist/js/libs.min.js', 'dist/js/scripts.min.js'],
        dest: 'dist/css/styles/styles.min.css'
      }
    }
    uglify: {
      scripts: ['dist/js/scripts.js'],
      dest: 'dist/js/scripts.js'
    },
    cssmin: {
      all: {
        src: [
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'css/**/*.css'
        ],
        dest: 'dist/css/styles.min.css'
      }
    },
    htmlmin: {
      options: {
        removeComents: true,
        collapseWithespace: true
      },
      views: {
        expand: true,
        cwd: 'view/',
        src: ['*.html'],
        dest: 'dist/view'
      }
    },
    copy: {
      all: {
        src: 'index-prod.html',
        dest: 'dist/index.html'
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Tarefas
  grunt.registerTask('prod', ['clean:all', 'jshint', 'concat:scripts', 'uglify:scripts', 'concat:libs', 'htmlmin', 'clean:temp']);
};

```
