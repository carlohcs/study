'use strict';

// Notação de Objeto

var name = 'John',
    birthday = 1981;

function age() {
    return new Date().getFullYear() - this.birthday;
}

// Modo antigo
var person = {
    name: name,
    birthday: birthday,
    age: age,
    toString: function() {
        return `${this.name} = ${this.age()}`;
    }
};

// moto es6

var person2 = {
    name,
    birthday,
    age,
    toString() {
        return `${this.name} = ${this.age()}`;
    }
};

console.log(person.toString());

console.log(person2.toString());