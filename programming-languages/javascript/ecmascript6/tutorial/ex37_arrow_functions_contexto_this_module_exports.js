this.desc = 'Sou o module.exports... :P';
const obj = { desc: 'Sou o obj... :p' };

const func = function() {
    console.log(this);
};
func();

// node
const funcBind = () => func.bind(obj);
funcBind();

const arrowFunc = () => console.log(this);
arrowFunc();

// Não houve alteração de contexto aqui, pois a arrow function não altera seu contexto. O contexto dela sempre será de onde ela foi definida.
const arrowFuncBind = arrowFunc.bind(obj);
arrowFuncBind();