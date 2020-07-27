# Promises

## Documentação oficial

[MDN - Mozilla Developer Network](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise )

Um objeto **Promise** é usado para processamento assíncrono e demorado. Um Promise está em um dos três estados:

* *pendente*: estado inicial, ainda não concluído ou rejeitado.
* *realizada*: sucesso na operação
* rejeitado: falha na operação.

Outro termo que descreve um estado é *determinado:* a Promise ou está realizada ou rejeitada, mas não pendente.

## Sintaxe

```javascript
new Promise(executor);
new Promise(function(resolve, reject) { ... });
```

### Parâmetros

**executor**

Uma função com dois argumentos *resolve* e *reject*. O primeiro argumento conclui a promise, o segundo argumento rejeita. Nós podemos chamar estas funções, somente após nossa operação estar completada.

## Descrição
A interface **Promise** representa um proxy para um valor não necessariamente conhecido quando a Promise é criada.
Isso permite a você associar métodos de tratamento para eventos da ação assíncrona: sucesso ou falha. Isso permite que métodos assíncronos retornem valores como métodos síncronos: ao ínves do valor final, o método assíncrono retorna um *promise* tendo um valor em algum momento no futuro.

Uma promise pendente pode se tornar *realizada* com um valor ou *rejeitada* por um motivo. Quando um desses estados ocorre, o método de tratamento associado a fila pelo método da promise *then* é chamado. (Se a promise já foi relizada ou rejeitada quando o método de tratamento correspondente for associado, o método será chamado, desta forma não há uma condição de competição entre uma operação assíncrona e seus manipuladores que estão sendo associados.)

Com os métodos `Promise.prototype.then` e `Promise.prototype.catch` retornam promises, eles podem ser encadeados - uma operação chamada *composição*.

![Promise workflow](https://mdn.mozillademos.org/files/8633/promises.png)

## Propriedades

`Promise.length`

Propriedade `length` cujo valor é 1 (número de argumentos do método construtor).

`Promise.prototype`

Representa o protótipo para o método construtor da Promise.

## Métodos

`Promise.all(lista)`

Retorna a promise que é resolvida quando todas as promises no argumento *lista* forem resolvidas.

`Promise.race(lista)`

Retorna uma promise que resolve ou rejeita assim que uma das promises do argumento *lista* resolve ou rejeita, com um valor ou o motivo daquela promise.

`Promise.reject(motivo)`

Retorna um objeto Promise que foi rejeitado por um dado motivo.

`Promise.resolve(valor)`

Retorna um objeto Promise que foi resolvido com um dado valor. Se o valor possui um método `then`, a promise retornada "seguirá" este método, adotando esse estado eventual; caso contrário a promise retornada será realizada com o valor.

## Protótipo Promise

### Propriedades

`Promise.prototype.constructor`

Retorna a função que cria uma instancia de prototype. Isto por padrão é uma função Promise.

### Métodos

`Promise.prototype.catch(onRejected)`

Adiciona um manipulador de callback para a promise e retorna uma nova promise resolvendo para o retorno do valor do callback se ele é chamado, ou para seu valor original.

`Promise.prototype.then(onFullFilled, onRejected)`

Adiciona manipuladores à Promise quando a mesma foi rejeitada ou resolvida.


### [Exemplos](./examples)
