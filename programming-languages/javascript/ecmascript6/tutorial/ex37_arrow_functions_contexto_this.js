// 'use strict'; => com o uso, o contexto global é desativado, resultando em this === global => false

// 1. Sintaxe Reduzida
// 2. this

/*
this
vs
this léxico
*/

/*
Node
vs
Browser
*/

// No browser = this => window
this.desc = 'Sou eu... :P';
console.log(this);

const func = function() {
    console.log(this === global);
};

func();

// node
const arrowFunc = () => console.log(this, this === module.exports);
arrowFunc();