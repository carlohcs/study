const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// ctx.beginPath();
const str = `Hello world!`;
ctx.font = "40px Arial";
// ctx.font = "italic 40px Arial";
ctx.fillStyle = "blue";
ctx.textAlign = 'left';

ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.shadowColor = 'rgba(0, 0, 0, .5)';

// fillText(text, x, y, maxWidth)
ctx.fillText(str, 100, 100, 800);
ctx.font = "22px Arial";
for(let index = 1; index <= 10; index++) {
    ctx.save();
    let calc = 150 + (index * 40);
    
    let togglePosition = index % 2 ? -1 : 1;

    // .scale(x, y) method of the Canvas 2D API adds a scaling transformation to the canvas units horizontally and/or vertically.
    ctx.scale(togglePosition, 1);

    // text, x, y [, maxWidth]
    ctx.fillText(`Counter: ${index}`, 200 * togglePosition, calc);
    ctx.restore();
}