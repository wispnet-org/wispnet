// game.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
    x: 50,
    y: 50,
    color: 'red',
    speed: 5,
};

let players = [player]; // Initialize with the local player

const ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('open', () => {
    console.log('Connected to the server');
});

ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);

    // Handle received messages (e.g., update player positions)
    if (message.type === 'movement' && message.playerId !== player.id) {
        handleRemoteMovement(message);
    }
});

function handleRemoteMovement(message) {
    const remotePlayer = players.find(p => p.id === message.playerId);

    if (remotePlayer) {
        switch (message.key) {
            case 'ArrowUp':
                remotePlayer.y -= remotePlayer.speed;
                break;
            case 'ArrowDown':
                remotePlayer.y += remotePlayer.speed;
                break;
            case 'ArrowLeft':
                remotePlayer.x -= remotePlayer.speed;
                break;
            case 'ArrowRight':
                remotePlayer.x += remotePlayer.speed;
                break;
        }
    }
}

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

        // Send player movement to the server
        const movement = {
            type: 'movement',
            playerId: player.id,
            key: event.key,
        };
        ws.send(JSON.stringify(movement));
    });
}

function update() {
    // Update game state (e.g., player positions, collisions)
}

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw local player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, 20, 20);

    // Draw remote players
    players.forEach(remotePlayer => {
        if (remotePlayer.id !== player.id) {
            ctx.fillStyle = remotePlayer.color;
            ctx.fillRect(remotePlayer.x, remotePlayer.y, 20, 20);
        }
    });
}

function spawnRemotePlayer(newPlayer) {
    // Example: Spawn a new remote player
    players.push(newPlayer);
}

function gameLoop()

