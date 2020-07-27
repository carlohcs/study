// https://www.youtube.com/watch?v=9SKm-kGX4jM&index=7&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2
var person = {
    name: 'Ana',
    address: { street: 'A', number: 1000 }
};

var { address: { street, number, cep } } = person;

console.log(`street => ${street}, number => ${number}, cep => ${cep}`);

// Error
// console.log('address object => ', address);

// Error
// var { conta: { numero, agencia } } = person;
// console.log(numero, agencia);

var person2 = [{
    name: 'Ana',
    address: { street: 'A', number: 1000 }
}, {
    name: 'Ana 2',
    address: { street: 'B', number: 2000 }
}];

var {
    [1]: { address: { street, number, cep } }
} = person2;

console.log(street, number);