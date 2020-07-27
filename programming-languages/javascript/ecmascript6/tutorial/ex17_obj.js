// https://www.youtube.com/watch?v=9SKm-kGX4jM&index=7&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2
var person = { name: 'Ana', age: 20 };

var { name, age } = person;
console.log(name, age);

var { name: n, age: a } = person;
console.log(n, a);

var { genrer, status = 'Ativa' } = person;
console.log(genrer, status);