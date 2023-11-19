import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";

const otakuConnect = express();
otakuConnect.use(cors());

const server = http.createServer(otakuConnect);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Поменяйте на "http://localhost:3000" или другой порт вашего React-приложения
    methods: ["GET", "POST"],
  },
});

// Маршрут для статических файлов React-приложения
const buildPath = path.join(__dirname, "OtakuConnect");
otakuConnect.use(express.static(buildPath));

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Обработчик отключения пользователя
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Все запросы, не обработанные socket.io, будут обслуживаться статическими файлами React-приложения
otakuConnect.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});