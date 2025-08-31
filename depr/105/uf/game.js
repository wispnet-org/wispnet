// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 50,
    y: 50,
    color: 'red',
    speed: 5,
};

function handleInput() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                player.y -= player.speed;
                break;
            case 'ArrowDown':
                player.y += player.speed;
                break;
            case 'ArrowLeft':
                player.x -= player.speed;
                break;
            case 'ArrowRight':
                player.x += player.speed;
                break;
        }
    });
}

function update() {
    // Update game state (e.g., player positions, collisions)
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, 20, 20);
}

function gameLoop() {
    handleInput();
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

