import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const otakuConnect = express();
otakuConnect.use(cors());

const server = http.createServer(otakuConnect);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

server.listen(3001, () => {
    console.log("server is running");
});