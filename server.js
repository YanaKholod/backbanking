const app = require("./index");
const mongoose = require("mongoose");
const WebSocket = require("ws");

const { DB_HOST } = process.env;
const PORT = 8080;

mongoose
  .connect(DB_HOST)
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
       console.log("A client connected to the WebSocket");
      
      ws.on("message", (message) => {
        console.log(message, "message");
        try {
          
          const senderRole = message.role;

          wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              if (senderRole === "user" && client._socket.role === "admin") {
                client.send(message);
              } else if (
                senderRole === "admin" &&
                client._socket.role === "user"
              ) {
                client.send(message);
              }
            }
          });
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      });

      ws.on("close", () => {
        ws.send("A client disconnected from the chat");
      });
    });

    wss.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
    process.on("SIGINT", () => {
      server.close(() => {
        console.log("Server and WebSocket closed.");
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
