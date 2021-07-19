const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

ctx.beginPath();

// (x, y, radius, startAngle, endAngle, anticlockwise?: boolean): 
// ctx.arc(320, 320, 100, 0, Math.PI); // metade do círculo
ctx.arc(320, 320, 100, 0, Math.PI * 2); // círculo completo
ctx.stroke();
ctx.fillStyle = 'yellow';
ctx.fill();

ctx.fillStyle = 'black';

ctx.beginPath();
ctx.arc(270, 270, 25, 0, Math.PI * 2);
ctx.stroke();
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(270+100, 270, 25, 0, Math.PI * 2);
ctx.stroke();
// ctx.fill();
ctx.closePath();