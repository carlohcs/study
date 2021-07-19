const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// ### DRAW Circles

// Main Circle (Head)
ctx.beginPath();
ctx.arc(320, 250, 100, 0, Math.PI * 2);
ctx.fillStyle = 'red';
ctx.fill();
ctx.stroke();
ctx.closePath();

ctx.fillStyle = 'black';
ctx.strokeStyle = 'black';

// Left eye
ctx.beginPath();
ctx.arc(280, 240, 25, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
ctx.closePath();

// Right eye
ctx.beginPath();
ctx.arc(360, 240, 25, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
ctx.closePath();

// ### DRAW TRIANGLE
ctx.beginPath();
// First line
ctx.moveTo(320, 120);
ctx.lineTo(200, 180);
ctx.stroke();

// Second line (320 + yAxis)
ctx.lineTo(320 + 120, 180);
ctx.stroke();

// Third line
ctx.lineTo(320, 120);
ctx.stroke();
ctx.fillStyle = 'blue';
ctx.fill();

ctx.closePath();

// ### DRAW Line + semi circle

// Nose
ctx.fillStyle = 'black';
ctx.beginPath();
ctx.moveTo(320, 250);
ctx.lineTo(320, 270);
ctx.stroke();
ctx.closePath();

// mouth
ctx.beginPath();
ctx.arc(320, 290, 50, 0, Math.PI);
ctx.fill();
ctx.stroke();
ctx.closePath();

// ### DRAW Body lines
// First line
ctx.beginPath();
ctx.moveTo(320, 350);
ctx.lineTo(320, 490);
ctx.stroke();
ctx.closePath();

// Left arm
ctx.beginPath();
ctx.moveTo(320, 490);
ctx.lineTo(220, 600);
ctx.stroke();
ctx.closePath();

// Right arm
ctx.beginPath();
ctx.moveTo(320, 490);
ctx.lineTo(420, 600);
ctx.stroke();
ctx.closePath();

// Hands
ctx.beginPath();
ctx.moveTo(220, 390);
ctx.lineTo(420, 390);
ctx.stroke();
ctx.closePath();
