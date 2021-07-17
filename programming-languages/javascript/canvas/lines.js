const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Horizontal
for(let index = 0; index < 10; index++) {
    ctx.lineWidth = 1 + index;
    ctx.beginPath();
    ctx.moveTo(100, 50 + (index * 50));
    ctx.lineTo(500, 50 + (index * 50));
    ctx.stroke();
}

ctx.clearRect(0, 0, 640, 640);

// Vertical
ctx.beginPath();
ctx.lineWidth = 10;
// line`s style
ctx.lineCap = 'butt';
ctx.moveTo(100, 10);
ctx.lineTo(100, 500);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 10;
// line`s style
ctx.lineCap = 'round';
ctx.moveTo(200, 10);
ctx.lineTo(200, 500);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.lineWidth = 10;
// line`s style
ctx.lineCap = 'square';
ctx.moveTo(300, 10);
ctx.lineTo(300, 500);
ctx.stroke();

ctx.clearRect(0, 0, 640, 640);

ctx.beginPath();
ctx.lineWidth = 30;
ctx.lineJoin = 'bevel';
ctx.moveTo(100, 10);
ctx.lineTo(200, 110);
ctx.lineTo(100, 220);
ctx.lineTo(200, 320);
ctx.lineTo(100, 420);
ctx.lineTo(200, 520);
ctx.stroke();