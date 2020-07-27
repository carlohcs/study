'use strict';

this.desc = 'Sou eu... :P';
console.log(this);

const func = function() {
    console.log(this === undefined);
};

func();

// node
const arrowFunc = () => console.log(this, this === module.exports);
arrowFunc();