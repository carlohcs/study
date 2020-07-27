// https://www.youtube.com/watch?v=KrB6wFuK6Qg&index=12&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2
'use strict';

var
    estoque = [
        { nome: 'Remsa de papel A4', preco: 19.90, qtd: 300, fragil: false },
        { nome: 'Monitor LG 29 IPS', preco: 1699, qtd: 15, fragil: true },
        { nome: 'Ovos brancos - 30 uni.', preco: 18.90, qtd: 21, fragil: true },
        { nome: 'Remsa de papel A4', preco: 1027.34, qtd: 16, fragil: false },
        { nome: 'Apple Ipad Pro 32gb', preco: 3999, qtd: 17, fragil: true }
    ];

// ES5
var
    qtdProdutosCarosEFrageisES5 = estoque
    .filter(function(item) {
        return item.preco >= 1000;
    })
    .filter(function(item) {
        return item.fragil
    })
    .map(function(item) {
        return item.qtd;
    })
    .reduce(function(total, qtde) {
        return total + qtde;
    });

console.log(qtdProdutosCarosEFrageisES5);

// ES6
/*
var
    qtdProdutosCarosEFrageisES6 = estoque
    .filter(item => item.preco >= 1000)
    .filter(item => item.fragil)
    .map(item => item.qtd)
    .reduce((total, qtde) => total + qtde);
*/

const isPrecoAlto = item => item.preco >= 1000;
const isFragil = item => item.fragil;
const somatorio = (total, qtde) => total + qtde;

var
    qtdProdutosCarosEFrageisES6 = estoque
    .filter(isPrecoAlto)
    .filter(isFragil)
    .map(item => item.qtd)
    .reduce(somatorio);

console.log(qtdProdutosCarosEFrageisES6);

// Modos

/*
  param => setenca
  (param [, param]) => sentenca
  param => {
    sentenca
    sentenca
  }
  (param [, param]) => {
    sentenca
    sentenca
  }
  () => sentenca
  () => {
    sentenca
    sentenca
  }
  (param [, param]) => {
    chave1: valor1,
    chave2: valor2
  })

*/