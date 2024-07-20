const WebSocket = require("ws");
const express = require("express");
const compression = require("compression");

const app = express();
const port = 3000;

app.use(compression());
app.use(express.json());

// Handle HTTP GET requests to the root path
app.get("/", (req, res) => {
  res.send("Hello, Casino Game!");
});

const server = app.listen(port, () => {
  console.log(`HTTP server running on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);

    // Handle game logic and respond with minimal data
    const response = JSON.stringify({ event: "update", data: "Minimal data" });
    ws.send(response);
  });

  ws.send(
    JSON.stringify({ event: "connected", data: "Welcome to the casino game!" })
  );
});

console.log("WebSocket server running on ws://localhost:3000");
