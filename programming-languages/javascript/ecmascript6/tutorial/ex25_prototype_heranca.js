// https://www.youtube.com/watch?v=tZQwnNdXDfg&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2&index=8&spfreload=1
// Herança
'use strict';

// Modo 1
var avo = { attr1: 'A' };
var pai = { __proto__: avo, attr2: 'B' };
var filho = { __proto__: pai, attr3: 'C' };
console.log(filho.attr1, filho.attr2, filho.attr3);

// Modo antigo e agora também padronizado
var mae = { corCabelo: 'Castanho' };
var filha = {};
Object.setPrototypeOf(filha, mae);
console.log(filha.corCabelo);