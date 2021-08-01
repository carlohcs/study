const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const grid = 60;

canvas.setAttribute("width", grid * 15);
canvas.setAttribute("height", grid * 10);
canvas.style.backgroundColor = "black";
document.body.prepend(canvas);

const playerSize = grid / 2 - 20;
const bricks = { arr: [], total: 48 };
const game = {
  play: false,
  gameOver: true,
  startFromInit: true,
  req: "",
  grid: grid,
  speed: 60,
  ball: {
    defaults: {
      x: grid * 7 + playerSize,
      y: grid * 8 - playerSize,
      w: grid / 3,
      h: grid / 3,
      dx: 0,
      dy: 0,
    },
  },
  player: {
    defaults: {
      x: grid * 7,
      y: grid * 8,
      w: grid * 2,
      h: grid / 3,
      color: "red",
      speed: 5,
      score: 0,
      lives: 1,
    },
  },
};
const player = Object.assign({}, game.player.defaults);
const ball = Object.assign({}, game.ball.defaults);

const keyz = {
  ArrowLeft: false,
  ArrowRight: false,
};

const handleKey = (e, activate) => {
  if (e.code in keyz) {
    keyz[e.code] = activate;
  }
};

function checkCollision(obj1, obj2, log) {
  const checkX = obj1.x < obj2.x + obj2.w && obj1.x + obj1.w > obj2.x;
  const checkY = obj1.y < obj2.y + obj2.h && obj1.y + obj1.h > obj2.y;

  if (log) {
    console.log("checkX: ", checkX);
    console.log("checkY: ", checkY);
  }

  return checkX && checkY;
}

function drawPlayer() {
  ctx.beginPath();
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.closePath();
}

function movementPlayer() {
  if (keyz.ArrowLeft && player.x > 0) {
    player.x -= player.speed;
  }
  if (keyz.ArrowRight && player.x < canvas.width - player.w) {
    player.x += player.speed;
  }
}

function movementBall() {
  if (ball.x > canvas.width || ball.x < 0) {
    ball.dx *= -1;
  }

  if (ball.y > canvas.height || ball.y < 0) {
    ball.dy *= -1;
  }

  if (ball.y > canvas.height) {
    player.lives--;
    resetBall();
  }

  if (!game.startFromInit) {
    ball.x = player.x + player.w / 2;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;
}

function drawScore() {
  const output = `Score: ${player.score} / Live(s): ${player.lives}`;
  const outputGameOver = `GAME OVER! Your Score: ${player.score}`;
  const gameOver = game.gameOver;
  const message = gameOver ? outputGameOver : output;

  if (gameOver) {
    // Red background
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    // Click to restart box
    ctx.beginPath();
    ctx.fillStyle = "#000";
    // x, y, w, h
    ctx.fillRect(0, canvas.height / 2 - grid, canvas.width, grid * 2);
    ctx.closePath();
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(
      "Click here to restart game!",
      canvas.width / 2,
      canvas.height / 2 + 10
    );
  }

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height - 40);
}

function drawBall() {
  const adj = ball.w / 2;

  // Box
  ctx.beginPath();
  ctx.strokeStyle = "white";
  ctx.rect(ball.x, ball.y, ball.w, ball.h);
  // ctx.stroke(); // show rect
  ctx.closePath();

  // Arc
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(ball.x + adj, ball.y + adj, ball.w / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function createBrick(x, y, w, h) {
  let isBad = Math.random() < 0.1;
  let color = `#${Math.random().toString().substr(-6)}`; // generate a 6 random numbers

  bricks.arr.push({
    x: x,
    y: y,
    w: w,
    h: h,
    color: color,
    bad: isBad,
  });
}

function drawBricks() {
  bricks.arr.forEach((block, index) => {
    ctx.beginPath();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, block.w, block.h);
    ctx.strokeRect(block.x, block.y, block.w, block.h);
    ctx.stroke();
    ctx.closePath();
  });
}

function checkLossGame() {
  if (player.lives < 0) {
    gameOver();
  }
}

function gameOver() {
  game.gameOver = true;
  stopRequestAnimationFrame();
}

function resetBall() {
  const properties = Object.keys(game.ball.defaults);

  properties.forEach((propertie) => {
    ball[propertie] = game.ball.defaults[propertie];
  });

  ball.y = player.y - ball.h;
  ball.x = player.x + player.w / 2;

  game.startFromInit = false;
}

function gamePrepare() {
  let margin = 10;
  let xPos = game.grid / 2;
  let yPos = 0;
  let width = game.grid;
  let height = game.grid / 2;
  let totalAcross = Math.floor(canvas.width - game.grid) / (width + margin);

  for (let index = 0; index < bricks.total; index++) {
    if (index % totalAcross === 0) {
      yPos += height + margin;
      xPos = game.grid / 2;
    }

    createBrick(xPos, yPos, width, height);
    xPos += width + margin;
  }
}

function resetPlayer() {
  const properties = Object.keys(game.player.defaults);

  properties.forEach((propertie) => {
    player[propertie] = game.player.defaults[propertie];
  });
}

function startGame() {
  // game.play = true;

  startRequestAnimationFrame();
}

function restartGame() {
  game.play = true;
  game.gameOver = false;
  game.startFromInit = false;
  resetPlayer();
  resetBall();
  resetBricks();
  gamePrepare();
  startGame();
}

function startRequestAnimationFrame() {
  game.req = requestAnimationFrame(draw);
}

function stopRequestAnimationFrame() {
  cancelAnimationFrame(game.req);
}

function resetBricks() {
  bricks.arr = [];
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (game.play) {
    movementPlayer();
    movementBall();
    drawBricks();
    drawBall();
    drawPlayer();

    if (checkCollision(player, ball)) {
      ball.dy *= -1;
    }

    bricks.arr.forEach((brick, index) => {
      if (checkCollision(brick, ball)) {
        bricks.arr.splice(index, 1);
        player.score++;
        ball.dy *= -1;
      }
    });

    startRequestAnimationFrame();
  }

  checkLossGame();
  drawScore();
}

document.addEventListener("keydown", (e) => {
  handleKey(e, true);

  if (e.code == "ArrowUp" && !game.startFromInit) {
    game.startFromInit = true;
    ball.dx = 5;
    ball.dy = -5;
  }
});

document.addEventListener("keyup", (e) => {
  handleKey(e, false);
});

document.addEventListener("mousemove", (e) => {
  const x = e.clientX - canvas.offsetLeft;

  if (x > player.w && x < canvas.width) {
    player.x = x - player.w;

    if (!game.startFromInit) {
      ball.x = x - player.w / 2;
    }
  }
});

canvas.addEventListener("click", (e) => {
  if (game.gameOver) {
    const buttonPosition = {
      x: 0,
      y: canvas.height / 2 - grid,
      w: canvas.width,
      h: grid * 2,
    };

    const rect = canvas.getBoundingClientRect();

    const mouseObj = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      w: 5,
      h: 5,
    };

    if (checkCollision(buttonPosition, mouseObj)) {
      restartGame();
    }
  }
  /*
    if (game.gameover) {
      game.gameover = false;
      startGame();
      game.ani = requestAnimationFrame(draw);
    } else if (!game.inplay) {
      game.inplay = true;
      ball.dx = 5;
      ball.dy = -5;
    }
    */
});

gamePrepare();
draw();
