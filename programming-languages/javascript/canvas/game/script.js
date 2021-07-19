const canvas = document.createElement('canvas');
const grid = 50;
canvas.setAttribute('width', grid * 20);
canvas.setAttribute('height', grid * 15);
canvas.style.border = '1px solid #000';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
const game = { req: '' };
const player = {
    x: canvas.width / 2, 
    y: canvas.height / 2,
    size: 30,
    speed: 5
};
const keys = {
    ArrowLeft: false, 
    ArrowRight: false, 
    ArrowUp: false, 
    ArrowDown: false
};

document.addEventListener('keydown', (e) => {
    if(e.code in keys) {
        keys[e.code] = true;
    }
});
document.addEventListener('keyup', (e) => {
    if(e.code in keys) {
        keys[e.code] = false;
    }
});
// console.log(player);

/*
canvas.addEventListener('click', () => {
    player.speed *= -1;
});
*/

// drawPath();
// draw();
// drawCircle();
/*for(let index = 0; index < 10; index++) {
    drawMove(index);
}*/

game.req = requestAnimationFrame(drawMove);

const movementPlayer = () => {
    if(keys['ArrowLeft']) {
        player.x -= player.speed;
    }
    
    if(keys['ArrowRight']) {
        player.x += player.speed;
    }

    if(keys['ArrowUp']) {
        player.y -= player.speed;
    }
    
    if(keys['ArrowDown']) {
        player.y += player.speed;
    }
};

const restringePlayerMovement = () => {
    if(player.y >= canvas.height) {
        player.y = canvas.height;
    } else if(player.y <= 0) {
        player.y = 0;
    }

    if(player.x >= canvas.width) {
        player.x = canvas.width;
    } else if(player.x <= 0) {
        player.x = 0;
    }
}

function drawMove(/*index*/) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movementPlayer();

    restringePlayerMovement();
    
    ctx.beginPath();
    // x, y, startAng, finalAngle, rounded, otherwise
    // Head
    ctx.fillStyle = 'red';
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, 5, 5);
    // ctx.closePath();
    game.req = requestAnimationFrame(drawMove);
}

function drawCircle() {
    ctx.beginPath();
    // x, y, startAng, finalAngle, rounded, otherwise
    // Head
    ctx.fillStyle = 'yellow';
    ctx.arc(300, 100, 50, 0, Math.PI * 2, true);
    ctx.fill();

    // Eyes
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.moveTo(300, 80);
    ctx.arc(280, 80, 15, 0, Math.PI * 2, true);
    ctx.moveTo(355, 80);
    ctx.arc(320, 80, 15, 0, Math.PI * 2, true);
    

    // Mouth
    ctx.moveTo(350, 110);
    ctx.arc(300, 110, 35, 0, Math.PI, false);

    ctx.fill();
}


function drawPath() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(canvas.width / 2, canvas.height / 2, 5, 5);
    ctx.fillRect(100, 100, 5, 5);
    ctx.fillRect(100, 300, 5, 5);
    ctx.fillStyle = 'red';

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(100, 100);
    ctx.lineTo(100, 300);
    ctx.lineTo(canvas.width / 2, canvas.height / 2);
    ctx.stroke();
    ctx.fill();
}

function draw() {
    // ctx.fillRect(x, y, w, h)
    ctx.fillRect(5, 10, 50, 30);
    ctx.strokeRect(150, 10, 50, 30);
}