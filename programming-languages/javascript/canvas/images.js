const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const logo = document.querySelector('img');

logo.style.display = 'none';

// drawImage(object, x, y, width, height)
// ctx.drawImage(logo, 0, 0, 400, 400);

ctx.clearRect(0, 0, 640, 640);

// Alternative 
// Its not necessary to load image as early
// We can build an image in runtime
const myImg = new Image();
myImg.src = './d.png'; // could be an link. Eg: https://server.com/images/name.png

// ### Getting an part from image
// drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
// sx, sy, sWidth, sHeight = sourceX, sourceY, sourceWidth, sourceHeight
// dx, dy, dWidth, dHeight = destinationX, destinationY, destinationWidth, destinationHeight
const sX = 50;
const sY = 50;
const sWidth = 100;
const sHeight = 100;

const dX = 100;
const dY = 400; // dWidth + dHeight
const dWidth = sWidth * 2; // 200
const dHeight = sHeight * 2; // 200

myImg.onload = function () {
  ctx.drawImage(myImg, sX, sY);
  ctx.drawImage(myImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
  ctx.strokeStyle = 'red';
  // strokeRect(x, y, width, height)
  ctx.strokeRect(sX * 2, sY * 2, sWidth, sHeight);
  ctx.strokeRect(dX, dY, dWidth, dHeight);
}

