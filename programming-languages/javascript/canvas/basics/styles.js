const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// createLinearGradient(x0, y0, x1, y1)
const colorz = ctx.createLinearGradient(0, 0, 400, 400);
colorz.addColorStop(0, '#00ff00');
colorz.addColorStop(0.5, '#ff0000');
colorz.addColorStop(1, '#0000ff');

ctx.fillStyle = colorz;
ctx.fillRect(100, 100, 300, 300);

ctx.strokeStyle = colorz;
ctx.moveTo(10, 0);
ctx.lineWidth = 10;
ctx.lineTo(10, 500);
ctx.stroke();

ctx.clearRect(0, 0, 640, 640);

// createRadialGradient(x0, y0, r0, x1, y1, r1)
const colorz2 = ctx.createRadialGradient(300, 300, 0, 300, 300, 200);
colorz2.addColorStop(0, '#00ff00');
colorz2.addColorStop(0.5, '#ff0000');
colorz2.addColorStop(1, '#0000ff');

ctx.fillStyle = colorz2;
ctx.fillRect(100, 100, 500, 500);
ctx.strokeStyle = colorz2;

ctx.lineWidth = 10;
ctx.moveTo(10, 0);
ctx.lineTo(10, 500);
ctx.stroke();
