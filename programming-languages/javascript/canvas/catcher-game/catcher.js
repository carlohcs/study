const canvas = document.createElement("canvas");
const tile = 25;

canvas.setAttribute("height", tile * 20);
canvas.setAttribute("width", tile * 25);
canvas.style.backgroundColor = "black";

const enemies = { speed: 5, arr: [], total: 20 };
const game = {
  play: true,
  req: "",
  player: {
    defaults: {
      x: canvas.width / 2 - tile * 2,
      y: canvas.height - tile * 3,
      speed: 5,
      width: tile * 4,
      height: tile * 1,
      color: "red",
      score: 0,
      lives: 10,
    },
  },
};
const player = Object.assign({}, game.player.defaults);

const ctx = canvas.getContext("2d");
document.body.prepend(canvas);

const keyz = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

const handleKey = (e, activate) => {
  if (e.code in keyz) {
    keyz[e.code] = activate;
  }
};

function checkCollision(obj1, obj2, log) {
  const checkX = obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x;
  const checkY = obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;

  if (log) {
    console.log("checkX: ", checkX);
    console.log("checkY: ", checkY);
  }

  return checkX && checkY;
}

function drawPlayer() {
  if (keyz.ArrowLeft && player.x > 0) {
    player.x -= player.speed;
  }
  if (keyz.ArrowRight && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
  if (keyz.ArrowUp && player.y > canvas.height - tile * 8) {
    player.y -= player.speed;
  }
  if (keyz.ArrowDown && player.y < canvas.height - tile) {
    player.y += player.speed;
  }
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawScore(gameOver) {
  const output = `Score: ${player.score} / Live(s): ${player.lives}`;
  const outputGameOver = `GAME OVER! Your Score: ${player.score}`;
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
    ctx.fillRect(0, canvas.height / 2 - 50, canvas.width, 100);
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
  ctx.fillStyle = "#222";
  ctx.fillRect(10, 10, canvas.width - 10, 50);
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(message, canvas.width / 2, 40);
}

function drawBalls() {
  enemies.arr.forEach((enemy, index) => {
    enemy.y += enemy.speed;

    if (enemy.y > canvas.height) {
      enemies.arr.splice(index, 1);
    }

    ctx.beginPath();
    ctx.fillStyle = enemy.color;
    if (enemy.toggle && enemy.bad) {
      enemy.growth++;
      enemy.size += 1;

      if (enemy.growth > 10) {
        enemy.toggle = false;
        enemy.growth = 0;
      }
    } else if (enemy.bad) {
      ctx.fillStyle = "#000";
      enemy.growth++;

      if (enemy.growth > 10) {
        enemy.toggle = true;
        enemy.growth = 0;
      }
      enemy.size -= 1;
    }
    ctx.strokeStyle = "white";
    ctx.arc(
      enemy.x + enemy.width / 2,
      enemy.y + enemy.height / 2,
      enemy.size,
      0,
      Math.PI * 2
    );
    // ctx.strokeRect(enemy.x, enemy.y, enemy.width, enemy.height); // create a box around circle
    ctx.fill();
    ctx.stroke();

    // ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
  });
}

function checkLossGame() {
  enemies.arr.forEach((enemy, index) => {
    if (checkCollision(player, enemy)) {
      let removed = enemies.arr.splice(index, 1)[0];

      if (removed.bad) {
        player.lives--;

        if (player.lives < 0) {
          gameOver();
          player.lives = "-";
        }
      } else {
        player.score += Math.ceil(removed.size);
      }
    }
  });
}

function createEnemy() {
  let xPos = Math.random() * (canvas.width - tile);
  let isBad = Math.random() < 0.1;
  let color = isBad ? "red" : `#${Math.random().toString().substr(-6)}`; // generate a 6 random numbers
  let width = Math.random() * 20 + 10;

  enemies.arr.push({
    x: xPos,
    y: Math.random() * -1000,
    width: width * 2,
    height: width * 2,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 5,
    color: color,
    bad: isBad,
    toggle: true,
    growth: 0,
  });
}

function gameOver() {
  cancelAnimationFrame(game.req);
  game.play = false;
}

function gameStart() {
  game.req = requestAnimationFrame(draw);
  game.play = true;
}

function gameRestart() {
  enemies.arr = [];

  const properties = Object.keys(game.player.defaults);

  properties.forEach((propertie) => {
    player[propertie] = game.player.defaults[propertie];
  });

  gameStart();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (enemies.arr.length < enemies.total) {
    createEnemy();
  }

  if (game.play) {
    drawBalls();
    drawPlayer();
    gameStart();
  }

  checkLossGame();
  drawScore(!game.play);
}

document.addEventListener("keydown", (e) => {
  handleKey(e, true);
});
document.addEventListener("keyup", (e) => {
  handleKey(e, false);
});

canvas.addEventListener("click", (e) => {
  if (!game.play) {
    const buttonPosition = {
      x: 0,
      y: canvas.height / 2 - 50,
      width: canvas.width,
      height: 100,
    };

    const rect = canvas.getBoundingClientRect();

    const mouseObj = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: 5,
      height: 5,
    };

    if (checkCollision(buttonPosition, mouseObj)) {
      gameRestart();
    }
  }
});

gameStart();
