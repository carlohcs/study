'use strict';

// https://www.youtube.com/watch?v=9SKm-kGX4jM&index=7&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2
var [a] = [10];
console.log(a);

var [n1, , n3, , n5, n6 = 0] = [10, 7, 9, 8];
console.log(n1, n3, n5, n6);

var [, [, nota]] = [
    [7, 8, 8],
    [9, 6, 8]
];
console.log(nota);