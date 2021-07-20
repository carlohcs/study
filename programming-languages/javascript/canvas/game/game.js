const canvas = document.createElement('canvas');
const grid = 50;
canvas.setAttribute('width', grid * 20);
canvas.setAttribute('height', grid * 15);
canvas.style.border = '1px solid #000';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
const game = { 
    req: '',
    bullets: [],
    bulletSpeed: 5,
    options: {
        player: {
            size: 30,
            speed: 5,
            cooldown: 0,
            score: 0,
        },
        restringePlayersCrossLine: true,
        cooldown: 20
    }
};
const players = [{
    id: 1,
    x: canvas.width / 2 + (grid * 2), 
    color: 'red',
    scorePosition: canvas.width / 2
}, {
    id: 2,
    x: canvas.width / 2 - (grid * 2), 
    color: 'blue',
    scorePosition: 0
}];
const keys = {
    // Firt Player
    ArrowLeft: false, 
    ArrowRight: false, 
    ArrowUp: false, 
    ArrowDown: false,
    // Second Player
    KeyA: false,
    KeyD: false,
    KeyW: false,
    KeyS: false
};

// TODO: understand better
// Improved: 
// a.x < b.x + b.size && a.x + a.size * 2 > b.x && a.y < b.y - b.size + b.size * 2 && a.y + a.size > b.y - b.size;
const collisionDetect = (a, b) =>  {
    let aX = a.x;
    let aY = a.y;
    let aSize = a.size * 2;

    let bX = b.x;
    let bY = b.y
    let bSize = b.size;

    const collisionHorizontal = aX < (bX + bSize) && (aX + aSize) > bX;
    const collisionVertical   = aY < (bY + bSize) && (aY + aSize) > bY; 

    return collisionHorizontal && collisionVertical;
};

const controlCoolDown = (player) => {
    if(player.cooldown <= 0) {
        player.cooldown = game.options.cooldown;
        const offsetX = 15;
        const offsetY = 5;

        const x = player.id === 1 ? player.x - player.size - offsetX : player.x + player.size + offsetX;
        const y = player.y - offsetY;
        const speed = player.id === 1 ? -game.bulletSpeed : game.bulletSpeed;
        const bulletData = {
            x: x, 
            y: y,
            speed: speed,
            size: 10,
            color: player.color
        };

        game.bullets.push(bulletData);
    }
};

const startGame = () => {
    cancelAnimationFrame(game.req);

    players.forEach((player) => {
        player.score = 0;
        player.cooldown = 0;
        player.speed = 5;
        player.size = grid / 2 + 5;
        player.y =  canvas.height / 2;

        if(player.id === 1) {
            player.x = canvas.width / 2 + (grid * 2);
        } else {
            player.x = canvas.width / 2 - (grid * 2);
        }
    });

    game.req = requestAnimationFrame(drawMove);
};

const movementPlayer = () => {
    const restringePlayersCrossLine = game.options.restringePlayersCrossLine;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const middleCanvas = canvasWidth / 2;
    const player1 = players[0];
    const player2 = players[1];
    const player1Size = player1.size;
    const player2Size = player2.size;

    const player1X = player1.x;
    const player1Y = player1.y;

    const player2X = player2.x;
    const player2Y = player2.y;

    // Player One
    if(keys['ArrowLeft']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player1X > (middleCanvas + player1Size))) {
            player1.x -= player1.speed;
        }
    }
    
    if(keys['ArrowRight']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player1X < (canvasWidth - player1Size))) {
            player1.x += player1.speed;
        }
    }

    if(keys['ArrowUp']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player1Y > player1Size)) {
            player1.y -= player1.speed;
        }
    }
    
    if(keys['ArrowDown']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player1Y < (canvasHeight - player1Size))) {
            player1.y += player1.speed;
        }
    }

    // Player Two
    if(keys['KeyA']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player2X > player2Size)) {
            player2.x -= player2.speed;
        }
    }
    
    if(keys['KeyD']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player2X + player2Size < middleCanvas)) {
            player2.x += player2.speed;
        }
    }

    if(keys['KeyW']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player2Y > player2Size)) {
            player2.y -= player2.speed;
        }
    }
    
    if(keys['KeyS']) {
        if(!restringePlayersCrossLine || (restringePlayersCrossLine && player2Y < (canvasHeight - player2Size))) {
            player2.y += player2.speed;
        }
    }
};

function drawMove(/*index*/) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movementPlayer();

    game.bullets.forEach((bullet, index) => {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x + (bullet.size / 2), bullet.y, bullet.size, bullet.size);
        bullet.x += bullet.speed;

        // remove bullet if it is finalized
        if(bullet.x < 0 || bullet.x > canvas.width) {
            game.bullets.splice(index, 1);
        }

        players.forEach((player, playerIndex) => {
            if(collisionDetect(bullet, player)) {
                game.bullets.splice(index, 1);

                if(playerIndex === 0) {
                    players[1].score++;
                } else {
                    players[0].score++;
                }
            }
        })
    });

    // Line between players
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    players.forEach((player) => {
        if(player.cooldown > 0) {
            player.cooldown--;
        }

        ctx.fillStyle = player.color;
        ctx.font = `${grid}px left`;
        ctx.fillText(`Score: ${player.score}`, player.scorePosition, grid);
    
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
        ctx.fill();
    })
      
    game.req = requestAnimationFrame(drawMove);
}

document.addEventListener('keydown', (e) => {
    if(e.code in keys) {
        keys[e.code] = true;
    }

    // Control bullets
    // For player 1
    if(e.code === 'Space') {
        controlCoolDown(players[0]);
    }

    // For player 2
    if(e.code === 'KeyE') {
        controlCoolDown(players[1]);
    }
});

document.addEventListener('keyup', (e) => {
    // console.log(e);
    if(e.code in keys) {
        keys[e.code] = false;
    }
});

canvas.addEventListener('click', startGame);

window.onload = function() {
    startGame();
}