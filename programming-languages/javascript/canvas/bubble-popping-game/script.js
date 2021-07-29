const grid = 40;
const canvas = document.createElement("canvas");
canvas.setAttribute("width", grid * 20);
canvas.setAttribute("height", grid * 15);
canvas.style.background = "#000";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
const game = { req: false, score: 0 };
const bubble = {
  bubbleCount: 30,
  bubbles: [],
  speed: 2,
};
const clicker = [];

function checkCollision(obj1, obj2) {
  const checkX = obj1.x < obj2.x + obj2.size && obj1.x + obj1.size > obj2.x;
  const checkY = obj1.y < obj2.y + obj2.size && obj1.y + obj1.size > obj2.y;

  return checkX && checkY;
}

function bubbleMaker() {
  let bubbleSize = Math.random() * 10 + 15;
  let xPos = Math.random() * (canvas.width - bubbleSize);
  let yPos = Math.random() * (canvas.height - bubbleSize) + canvas.height; // start from somewhere from bottom

  bubble.bubbles.push({
    x: xPos,
    y: yPos,
    size: bubbleSize,
    speed: Math.floor(Math.random() * 5) + bubble.speed,
    colors: [Math.random() * 255, Math.random() * 255, Math.random() * 255],
  });
}

function drawBubble(xPos, yPos, bubbleSize, colors) {
  ctx.beginPath();

  // createRadialGradient(x0, y0, r0, x1, y1, r1)
  const gradient = ctx.createRadialGradient(
    xPos,
    yPos - 10,
    bubbleSize - 15,
    xPos,
    yPos,
    bubbleSize + 10
  );
  gradient.addColorStop(
    0,
    `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, .9)`
  );
  gradient.addColorStop(1, "rgba(255, 255, 255, .1)");

  ctx.fillStyle = gradient;
  ctx.strokeStyle = "rgba(255, 255, 255, .4)";
  ctx.arc(xPos, yPos, bubbleSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawScore() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 20, canvas.width, 100);

  ctx.beginPath();
  ctx.font = "36px serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(`SCORE : ${game.score}`, canvas.width / 2, 50);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawScore();

  if (bubble.bubbles.length < bubble.bubbleCount) {
    bubbleMaker();
  }

  clicker.forEach((dot, index) => {
    ctx.beginPath();
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(dot.x, dot.y, dot.size, dot.size, Math.PI * 2);
    // ctx.fillRect(
    //   dot.x - dot.size / 2,
    //   dot.y - dot.size / 2,
    //   dot.size,
    //   dot.size,
    //   Math.PI * 2
    // );
    ctx.strokeStyle = "yellow";
    ctx.arc(
      dot.x - dot.size / 2,
      dot.y - dot.size / 2,
      dot.size,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    dot.size--;

    if (dot.size < 1) {
      clicker.splice(index, 1);
    }
  });

  bubble.bubbles.forEach((currentBubble, index) => {
    // currentBubble.y--; // normal
    // currentBubble.y -= 10; // fast
    // currentBubble.y -= bubble.speed; // default
    currentBubble.y -= currentBubble.speed; // default
    currentBubble.x -= Math.floor(Math.random() * 6) - 3;

    if (currentBubble.size + currentBubble.y < 0) {
      bubble.bubbles.splice(index, 1);
    }

    // Check colision
    clicker.forEach((dot) => {
      if (checkCollision(currentBubble, dot)) {
        bubble.bubbles.splice(index, 1);
        game.score++;
      }
    });

    drawBubble(
      currentBubble.x,
      currentBubble.y,
      currentBubble.size,
      currentBubble.colors
    );
  });

  requestAnimationFrame(draw);
}

game.req = requestAnimationFrame(draw);

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseClick = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    size: 50,
  };

  clicker.push(mouseClick);

  // Check colision
  //   bubble.bubbles.forEach((currentBubble, index) => {
  //     if (checkCollision(currentBubble, mouseClick)) {
  //       bubble.bubbles.splice(index, 1);
  //     }
  //   });
});
