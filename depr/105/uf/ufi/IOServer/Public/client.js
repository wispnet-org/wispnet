// public/client.js
const ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('open', () => {
    console.log('Connected to the server');
});

ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    // Handle received messages (e.g., update player positions)
    console.log('Received:', message);
});

// Example: Send player movement to the server
document.addEventListener('keydown', (event) => {
    const movement = {
        type: 'movement',
        key: event.key,
    };
    ws.send(JSON.stringify(movement));
});

