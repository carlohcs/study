'use strict';

function sum(a, b) {
    a = a !== undefined ? a : 1;
    b = b !== undefined ? b : 1;

    return a + b;
}

console.log(sum(), sum(2, 3), sum(0));