var funcs = [];
for(var i = 0; i < 10; i++) {
    funcs.push(function() {
        console.log(i);
    });
}

// Esperamos que seja '2' e '8', mas a saída é 10 por causa do hoisting
funcs[2]();
funcs[8]();