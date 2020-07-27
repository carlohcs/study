# Grunt Vs Gulp (Webpack)

## #1 - Qual é o melhor?

[https://www.youtube.com/watch?v=ZG0fSXOKcGM](https://www.youtube.com/watch?v=ZG0fSXOKcGM)

### Interesse

Inicialmente, o **Grunt** havia conquistado o mercado.

Em 2014, o **Gulp** começou a crescer até que em 2016, tomou liderança.

| *Em 03/2016* | Grunt | Gulp | Vencedor |
| --------- | ------ | ------ | ------ |
| **Downloads** | 1.632.998 | 2.149.907 | **Gulp**
| **Plugins**   | 5.563 | 2.237 | **Grunt**
| **Tamanho da comunidade** | 62 contribuidores, 10.591 stars no Github | 162 contribuidores, 19.682 stars no Github | **Gulp**
| **StackOverflow** | 20.487 perguntas | 15.685 perguntas | **Grunt**
| **Velocidade** | 920ms para executar algumas tasks | 493ms para as mesmas tasks. | **Gulp**

### Forma de utilizar

| Grunt | Gulp |
| ----- | ------ |
| Configuration over code / Você cria um arquivo de configurações. | Code over configuration / Você cria um arquivo de códigos. |

#### Como o Gulp consegue ser mais rápido?

No Gulp, é possível realizar este processo sem realizar I/O, utilizando a **memória**, por meio da API de **Stream** do Node.js.

No Grunt, é necessário executar tarefas serialmente, ou seja, se você quer juntar e depois comprimir, primeio é necessário realizar um output para uma pasta para em seguida, a próxima tarefa abrir e manipular este arquivo para outra saída.

**O Gulp executa as tarefas em paralelo ao contrário do Grunt.**

Gulp tem um método sequêncial:

```
return runSequence('clean', 'uglify')...
```

### Curva de aprendizado


| Grunt | Gulp |
| ----- | ------ |
| O autor do vídeo, acha mais fácil aprender. Você não tem que conhecer muito da API. | Requer conhecimento sobre a API de Stream do Node.js


## Afinal, quem é o melhor?

### O **Gulp** é mais divertido, tem velocidade maior. O código traz flexibilidade.

(e depende muito do projeto e como você enxerga.)

#### Senão quiser aprender muito de **Stream** e **Node.js**, vá para o **Grunt**.

## Estou utilizando Grunt no meu projeto atualmente, devo mudar?

### Depende, mas geralmente não é necessário. Dificilmente você altera algo no código.
(Só mude se tiver fiel a filosofia do **Gulp**.)

## Ou tente algo novo: *[Webpack](./Webpack.md)*

O Webpack unifica todos os componentes para que você não perca tempo configurando todos esses itens.
