const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
const speed = 5;
const options = {
  ballReset: true,
  players: {
    default: {
      x: 50,
      y: 50,
      speed: 5,
      width: 15,
      height: 200,
      score: 0,
    },
  },
  ball: {
    default: {
      x: canvas.width / 2,
      y: canvas.height / 2,
      width: 10,
      height: 10,
      xs: speed,
      ys: -speed,
    },
  },
};
const player1 = Object.assign({}, options.players.default, {
  x: canvas.width / 3 - 100,
});
const player2 = Object.assign({}, options.players.default, {
  x: canvas.width / 2 + 200,
});
const ball = Object.assign({}, options.ball.default);

const keyz1 = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};
const keyz2 = {
  KeyD: false,
  KeyA: false,
  KeyW: false,
  KeyS: false,
};

const handleKey = (event, activate) => {
  const currentKey = event.code;

  if (currentKey in keyz1) {
    keyz1[currentKey] = activate;
  }

  if (currentKey in keyz2) {
    keyz2[currentKey] = activate;
  }
};

const movePlayerOne = () => {
  let speed = player1.speed;
  const canvasWidth = canvas.width;

  if (keyz1.ArrowRight && player1.x < canvasWidth / 2 - player1.width) {
    player1.x += speed;
  } else if (keyz1.ArrowLeft && player1.x > 0) {
    player1.x -= speed;
  } else if (keyz1.ArrowUp) {
    player1.y -= speed;
  } else if (keyz1.ArrowDown) {
    player1.y += speed;
  }
};

const movePlayerTwo = () => {
  let speed = player2.speed;
  const canvasWidth = canvas.width;

  if (keyz2.KeyD && player2.x < canvasWidth - player2.width) {
    player2.x += speed;
  } else if (keyz2.KeyA && player2.x > canvasWidth / 2 - player2.width) {
    player2.x -= speed;
  } else if (keyz2.KeyW) {
    player2.y -= speed;
  } else if (keyz2.KeyS) {
    player2.y += speed;
  }
};

const moveBall = () => {
  const ballOptions = options.ball;
  ball.x += ball.xs;
  ball.y += ball.ys;

  // Check for limits of canvas
  if (ball.x < 0 || ball.x > canvas.width) {
    ball.xs *= -1;
  }

  // Check for limits of canvas
  if (ball.y < 0 || ball.y > canvas.height) {
    ball.ys *= -1;
  }

  // Check for collisions with players

  if (checkCollision(ball, player1)) {
    ball.xs *= -1;

    let temp = (player1.y + player1.height) / 2;
    let temp1 = (ball.y + ball.height) / 2;

    if (temp < temp1) {
      ball.ys = speed;
    } else {
      ball.ys = -speed;
    }
  }

  if (checkCollision(ball, player2)) {
    ball.xs *= -1;

    let temp = (player2.y + player2.height) / 2;
    let temp1 = (ball.y + ball.height) / 2;

    if (temp < temp1) {
      ball.ys = speed;
    } else {
      ball.ys = -speed;
    }
  }
};

function move() {
  movePlayerOne();
  movePlayerTwo();
}

function drawPlayers() {
  ctx.fillStyle = "red";
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

function drawHeader() {
  // let output = `Player 1 X ${player1.x} Y ${player1.y} / Player 2 X ${player2.x} Y ${player2.y} `;
  ctx.fillStyle = "#fff";
  ctx.font = "24px serif";
  ctx.textAlign = "center";
  let output = `Player1: ${player1.score} vs Player2: ${player2.score}`;
  ctx.fillText(output, 300, 30);
}

function drawBall() {
  ctx.fillStyle = "#fff";

  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function score() {
  if (ball.x < 0) {
    player2.score++;

    if (options.ballReset) {
      ballReset();
    }
  }

  if (ball.x > canvas.width) {
    player1.score++;

    if (options.ballReset) {
      ballReset();
    }
  }
}

function ballReset() {
  const defaultOptions = options.ball.default;
  const keys = Object.keys(defaultOptions);

  keys.map((key) => {
    ball[key] = defaultOptions[key];
  });
}

function checkCollision(obj1, obj2) {
  const checkX = obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x;
  const checkY = obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;

  return checkX && checkY;
}

function appendButtons() {
  const btn = document.createElement("button");
  const div = document.createElement("div");
  btn.textContent = "Game Reset";
  btn.addEventListener("click", () => {
    //reset game
    player1.score = 0;
    player2.score = 0;
    
    ballReset();
    
    player1.x = 50;
    player2.x = canvas.width - (50 + player2.width);
    player1.y = canvas.height / 2 - player1.height / 2;
    player2.y = canvas.height / 2 - player2.height / 2;
  });
  document.body.prepend(div);
  div.append(btn);
}

function draw() {
  clear();
  move();
  drawHeader();
  drawPlayers();
  drawBall();
  moveBall();

  score();

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

appendButtons();
document.addEventListener("keyup", (event) => handleKey(event, false));
document.addEventListener("keydown", (event) => handleKey(event, true));
