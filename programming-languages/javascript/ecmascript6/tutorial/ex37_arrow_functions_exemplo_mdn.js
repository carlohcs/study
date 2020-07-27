// Exemplo Mozilla Developer Network

// ES5
function Pessoa() {
    var self = this;
    self.idade = 0;

    setInterval(function() {
        // Maneira 'correta', pois estará apontando para seu próprio contexto
        // self.idade++;
        // console.log(self.idade);
        // Contexto global, e em global, não existe a propriedade idade
        this.idade++;
        console.log(this.idade);
    }, 1000);
}

// new Pessoa();


// ES6
function Pessoa() {
    this.idade = 0;

    // Contexto léxico
    setInterval(() => {
        // Maneira 'correta', pois estará apontando para seu próprio contexto
        // self.idade++;
        // console.log(self.idade);
        // Contexto global, e em global, não existe a propriedade idade
        this.idade++;
        console.log(this.idade);
    }, 1000);
}

new Pessoa();