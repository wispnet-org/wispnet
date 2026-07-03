const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const PLAYER_SIZE = 20;
const COIN_HITBOX = 24;
const COIN_RENDER_SIZE = 24;
const COIN_COUNT = 5;
const GAME_TIME = 60; // seconds
const coins = [];
const keys = {};
let score = 0;
let timeLeft = GAME_TIME;
let lastTime = 0;
let gameOver = false;
let state = "start"; 
let highScore = Number(localStorage.getItem("highScore")) || 0;
let touchX = null;
let touchY = null;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const coinImg = new Image();
coinImg.src = "coin.png";

const player = {
    x: 50,
    y: 50,
    color: "red",
    speed: 5,
};

function resizeCanvas() {
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

}
resizeCanvas();

function getCanvasScale() {
    return {
        x: canvas.width / canvas.getBoundingClientRect().width,
        y: canvas.height / canvas.getBoundingClientRect().height
    };
}

function startGame() {
    score = 0;
    timeLeft = GAME_TIME;
    gameOver = false;

    player.x = 50;
    player.y = 50;

    for (const coin of coins) {
    randomizeCoin(coin);
}

    state = "playing";
}

function saveHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    }
}

function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;

    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (state === "playing") {
        timeLeft -= delta;

        if (timeLeft <= 0) {
            timeLeft = 0;
            gameOver = true;
            state = "gameover";

            saveHighScore();
        }

        update(delta);
    }

    draw();

    requestAnimationFrame(gameLoop);
}
function randomizeCoin(coin) {
    coin.x = COIN_RENDER_SIZE / 2 +
        Math.random() * (canvas.width - COIN_RENDER_SIZE);

    coin.y = COIN_RENDER_SIZE / 2 +
        Math.random() * (canvas.height - COIN_RENDER_SIZE);
}
function spawnCoin() {
    return {
        x: COIN_RENDER_SIZE / 2 +
            Math.random() * (canvas.width - COIN_RENDER_SIZE),

        y: COIN_RENDER_SIZE / 2 +
            Math.random() * (canvas.height - COIN_RENDER_SIZE)
    };
}
for (let i = 0; i < COIN_COUNT; i++) {
    coins.push(spawnCoin());
}

const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", () => {
        if (state === "start" || state === "gameover") {
            startGame();
        }
    });
}

canvas.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
const rect = canvas.getBoundingClientRect();

touchX = t.clientX - rect.left;
touchY = t.clientY - rect.top;
});

canvas.addEventListener("touchend", () => {
    touchX = null;
    touchY = null;
});
canvas.addEventListener("touchmove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const scale = getCanvasScale();

    const t = e.touches[0];

    touchX = (t.clientX - rect.left) * scale.x;
    touchY = (t.clientY - rect.top) * scale.y;
});


document.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if (e.key === "Enter") {
        if (state === "start" || state === "gameover") {
            startGame();
        }
    }

    if (e.key.startsWith("Arrow")) {
        e.preventDefault();
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function update(delta) {
    if (state !== "playing") return;
    const move = player.speed * delta * 60;

    if (keys["ArrowUp"]) player.y -= move;
    if (keys["ArrowDown"]) player.y += move;
    if (keys["ArrowLeft"]) player.x -= move;
    if (keys["ArrowRight"]) player.x += move;

    if (touchX !== null) {
    const dx = touchX - (player.x + PLAYER_SIZE / 2);
    const dy = touchY - (player.y + PLAYER_SIZE / 2);

    const len = Math.hypot(dx, dy);

    if (len > 5) {
        player.x += (dx / len) * player.speed * delta * 60;

        player.y += (dy / len) * player.speed * delta * 60;

    }
    }

    // Keep player inside the canvas
    player.x = Math.max(0, Math.min(player.x, canvas.width - PLAYER_SIZE));
    player.y = Math.max(0, Math.min(player.y, canvas.height - PLAYER_SIZE));

    for (const coin of coins) {
    const hitLeft = coin.x - COIN_HITBOX / 2;
    const hitTop = coin.y - COIN_HITBOX / 2;

    if (
        player.x < hitLeft + COIN_HITBOX &&
        player.x + PLAYER_SIZE > hitLeft &&
        player.y < hitTop + COIN_HITBOX &&
        player.y + PLAYER_SIZE > hitTop
    ) {
        score++;

        randomizeCoin(coin);
    }
}


}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Coins
    for (const coin of coins) {
        ctx.drawImage(
            coinImg,
            coin.x - COIN_RENDER_SIZE / 2,
            coin.y - COIN_RENDER_SIZE / 2,
            COIN_RENDER_SIZE,
            COIN_RENDER_SIZE
        );

        // DEBUG HITBOX 
        /*
        ctx.strokeStyle = "red";
        ctx.strokeRect(
            coin.x - COIN_HITBOX / 2,
            coin.y - COIN_HITBOX / 2,
            COIN_HITBOX,
            COIN_HITBOX 
        ); */
    }

    // Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, PLAYER_SIZE, PLAYER_SIZE);

    // Score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    ctx.fillText(`Score: ${score}`, 10, 10);
    ctx.fillText(`Time: ${Math.ceil(timeLeft)}`, 100, 10);
    ctx.fillText(`High Score: ${highScore}`, 200, 10);

    if (state === "start") {
        drawMenu("Press ENTER or tap to start.");
    }

    if (state === "gameover") {
        drawMenu(`Game Over - Score: ${score}`);
    }
}


function drawMenu(text) {
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}


// Initialize once
coinImg.onload = () => {
    requestAnimationFrame(gameLoop);
};
