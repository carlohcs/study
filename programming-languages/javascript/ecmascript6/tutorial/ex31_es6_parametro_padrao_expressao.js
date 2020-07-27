'use strict';

function defVal() {
    return 2;
}

function sum(a = defVal() + 1, b = defVal()) {
    return a + b;
}

console.log(sum(), sum(2, 3), sum(0));