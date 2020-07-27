'use strict';

function sum(a, b) {
    a = a || 1;
    b = b || 1;

    return a + b;
}

console.log(sum(), sum(2, 3), sum(0));