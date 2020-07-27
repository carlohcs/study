// https://www.youtube.com/watch?v=8mTJPEcF3bw&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2&index=11
'use strict';

function media(...notas) { // rest
    var total = notas.reduce((soma, nota) => soma + nota);
    return total / notas.length;
}

console.log(media(7.3, 7.7, 6.0));
// spread
// console.log(...notas);