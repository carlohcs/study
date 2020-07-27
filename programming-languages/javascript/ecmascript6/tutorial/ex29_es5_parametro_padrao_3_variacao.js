'use strict';

function sum(a, b) {
    a = (0 in arguments) ? a : 1;
    b = (1 in arguments) ? b : 1;

    return a + b;
}

console.log(sum(), sum(2, 3), sum(0));