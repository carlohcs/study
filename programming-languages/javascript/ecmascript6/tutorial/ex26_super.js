// https://www.youtube.com/watch?v=tZQwnNdXDfg&list=PLDm7BSK-M5Yk30T65F5yeuCcStOQBPKq2&index=8&spfreload=1
'use strict';

// Herança e utilização de método da classe pai
var pai = {
    func() { return 'Pai'; }
};

var filho = {
    func() { return `${super.func()} + filho`; }
};

Object.setPrototypeOf(filho, pai);
console.log(filho.func());