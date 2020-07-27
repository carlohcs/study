'use strict';

// https://www.youtube.com/watch?v=9SKm-kGX4jM&index=7&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2
function rand({ min = 0, max = 1000 }) {
    var value = Math.random() * (max - min);

    return Math.floor(value) + min;
}

console.log(rand({ min: 40, max: 50 }));
console.log(rand({ min: 955 }));

console.log(rand({}));

// Error
// console.log(rand());