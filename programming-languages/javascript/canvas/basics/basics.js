const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// ### CREATES A SQUARE ### 
// Color that will be element colored
// filled shape
ctx.fillStyle = "red";
// fillRect(x, y, width, height)
ctx.fillRect(100, 100, 500, 300);

// ### CREATES A SQUARE - JUST LINES ### 
// strokeRect(x, y, width, height)
// outline
ctx.strokeRect(90, 90, 520, 320);

// ### CLEAR A DETERMINED AREA ###
// The clearRect() method sets the pixels in a rectangular area to transparent black (rgba(0,0,0,0)). The rectangle's corner is at (x, y), and its size is specified by width and height.
// clearRect(x, y, width, height)
// transparent
ctx.clearRect(150, 150, 400, 200);

// ### HEXADECIMALS ###
// R, G, B (00, 00, 00)
ctx.fillStyle = "#0000ff";
ctx.fillRect(40, 40, 100, 100);

ctx.fillStyle = "#00ff00";
ctx.fillRect(80, 80, 100, 100);

ctx.fillStyle = "rgb(255, 0, 255)";
ctx.fillRect(120, 120, 100, 100);

ctx.fillStyle = "rgb(255, 0, 255, .2)";
ctx.fillRect(20, 20, 400, 400);

// ### CREATES A SQUARE - BUT DOENST DRAW ### 
// rect(x, y, width, height)
// ctx.fillStyle = 'red';
// ctx.strokeStyle = 'blue';

// ctx.rect(100, 100, 200, 100);
// ctx.fill();
// ctx.stroke();

// THIS UP IS EQUAL TO ABOVE 
// ctx.strokeRect(100, 200, 200, 100);


// ### LINES
// .beginPath(x, y) method of the Canvas 2D API starts a new path by emptying the list of sub-paths. Call this method when you want to create a new path.
// ctx.beginPath(300, 300);

// moveTo(x, y) method of the Canvas 2D API begins a new sub-path at the point specified by the given (x, y) coordinates.
// Line from top left to bottom right => "\""
ctx.moveTo(0, 0);
// lineTo(x, y) add a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
ctx.lineTo(640, 640);
ctx.stroke(); // applies the shape by drawing

// Line from top right to bottom left => "/"
ctx.moveTo(640, 0);
// lineTo(x, y) add a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
ctx.lineTo(0, 640);
ctx.stroke(); // applies the shape by drawing

// Line from top to bottom => "|"
ctx.moveTo(320, 0);
// lineTo(x, y) add a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
ctx.lineTo(320, 640);
ctx.stroke(); // applies the shape by drawing

// Line from middle => "-"
ctx.moveTo(0, 320);
// lineTo(x, y) add a straight line to the current sub-path by connecting the sub-path's last point to the specified (x, y) coordinates.
ctx.lineTo(640, 320);
ctx.stroke(); // applies the shape by drawing

// ### TRIANGLE BY LINES
ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo(320, 200);
ctx.lineTo(160, 400); // 160 middle of 320, that is midle of 640
ctx.stroke();
ctx.lineTo(480, 400);
ctx.stroke();
ctx.lineTo(320, 200);
ctx.stroke();
ctx.fillStyle = 'red';
ctx.fill();
ctx.closePath();