const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
let angRot = 0;

img.onload = function() {
    let cache = this;

    setInterval(() => {
        ctx.save();

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ctx.translate(x, y)
        ctx.translate(320, 320);
        ctx.rotate(Math.PI / 180 * (angRot += 10));
        ctx.drawImage(img, -cache.width / 2, -cache.height / 2);

        ctx.restore();
    }, 40);
};

img.src = './disc.png';