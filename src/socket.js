import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname, join } from 'path';
import { connect } from 'http2';
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(join(__dirname, '../dist')));
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist', 'index.html'));
});


 app.get('/room', (req, res) => {
   res.sendFile(path.join(__dirname, '../dist', 'index.html'));
 });

app.post('/room/create-room', (req, res) => {

  res.json({ roomId: generateUniqueId() });
})


const server = createServer(app);
const io = new Server(server);


const connectedUsers = {};
const rooms = {};

const PORT = process.env.PORT || 3001;


io.on("connection", (socket) => {
  const randomNickname = generateRandomNickname();
  
  const user = {
    socket: socket,
    nickname: randomNickname,
    likedAnime: [],
    roomId: null,
  };
  connectedUsers[socket.id] = user;
  updateUsersList();
  console.log(`Пользователь ${connectedUsers[socket.id].nickname} подключился`);
 
  socket.on("userArray", (serializedData) => {
   connectedUsers[socket.id].likedAnime = serializedData.likedAnime;
   compareLikedAnime(connectedUsers[socket.id]);
  });
 
  socket.on("create-room", () => {
    const roomId = generateUniqueId();
    rooms[roomId] = { users: [socket.id] };

    connectedUsers[socket.id].roomId = roomId;

    socket.emit("room-created", { roomId });

    updateUsersList();
  })

  socket.on("disconnect", () => {
   console.log(`Пользователь ${connectedUsers[socket.id].nickname} отключился`);
   
   const roomId = connectedUsers[socket.id].roomId;
   if(roomId) {
    const room = rooms[roomId];
    if(room) {
      room.users = room.users.filter((userId) => userId !== socket.id);
      room.users.forEach((userId) => {
        connectedUsers[userId].socket.emit("user-left-room", { nickname: connectedUsers[socket.id].nickname });
      });

      if (room.users.length === 0) {
        delete rooms[roomId];
      }
    }
   }

   delete connectedUsers[socket.id];
   updateUsersList();
  });
 
  socket.on("updateLikedList", (updateLikedList) => {
    connectedUsers[socket.id].likedAnime = updateLikedList;

    compareLikedAnime(connectedUsers[socket.id]);

    updateUsersList();
  });

  function compareLikedAnime(currentUser) {
    Object.values(connectedUsers).forEach((otherUser) => {
     if (otherUser.socket.id === currentUser.socket.id) {
      return;
     }
  
     const match = currentUser.likedAnime.find((anime1) =>
      otherUser.likedAnime.some((anime2) => anime1.id === anime2.id)
     );
  
     if (match) {
      currentUser.socket.emit("matchingAnime", {
       nickname: otherUser.nickname,
       image: match.image,
       name: match.name,
      });
      otherUser.socket.emit("matchingAnime", {
       nickname: currentUser.nickname,
       image: match.image,
       name: match.name,
      });
     }
    });
   }
 
  function updateUsersList() {
   const usernames = Object.values(connectedUsers).map((u) => u.nickname);
   io.emit("userList", usernames);
  }
 });
 
 server.listen(PORT, () => {
  console.log("Listening app dev:" + PORT);
 });
 
 function generateUniqueId() {
  return Math.random().toString(36).substring(7)
 }

 function generateRandomNickname() {
  const adjectives = ["New", "Old", "Skilled", "Loser", "Best", "Worst", "Cringe", "Roflan", "Super", "Gay", "Freaky", "Lazy", "Lesbian", "Black"];
  const nouns = ["Otaku", "Hikki", "Anime guy", "Clown", "King", "Swordsman", "Anime girl", "Lady", "Gentleman", "Prince", "Philosopher", "Dreamer", "Adventurer", "Maverick"];
 
  const randomAdjective =
   adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
 
  return randomAdjective + " " + randomNoun;
 }
 