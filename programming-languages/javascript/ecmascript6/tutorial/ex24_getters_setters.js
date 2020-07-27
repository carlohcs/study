'use strict';

var sequence = {
    __id: 1,
    get id() { return this.__id++; },
    set id(id) { this.__id = id; }
};

console.log(sequence.id, sequence.id);
sequence.id = 100;

// List<Object> lista = new ArrayList();
// lista.add('AAA')
// lista.add('BBB')

// Java
// for (Object obj : lista) {
//  System.out.println(obj);
// }

// JS
// for (let obj of lista) {
//  console.log(obj);
// }

// for ([index, obj] of lista) {
//  console.log(`Index: ${index}, Obj: ${obj}`);
//}