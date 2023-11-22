import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const server = createServer(app);
const io = new Server(server);


const connectedUsers = {};

const PORT = process.env.PORT || 8080;


io.on("connection", (socket) => {
  const randomNickname = generateRandomNickname();
  
  const user = {
    socket: socket,
    nickname: randomNickname,
    likedAnime: [],
  };
  connectedUsers[socket.id] = user;
  updateUsersList();
  console.log(`Пользователь ${connectedUsers[socket.id].nickname} подключился`);
 
  socket.on("userArray", (serializedData) => {
   connectedUsers[socket.id].likedAnime = serializedData.likedAnime;
   compareLikedAnime(connectedUsers[socket.id]); 
  });
 
  socket.on("disconnect", () => {
   console.log(`Пользователь ${connectedUsers[socket.id].nickname} отключился`);
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
  console.log("Listening app at http://localhost:" + PORT);
 });
 
 function generateRandomNickname() {
  const adjectives = ["Happy", "Silly", "Clever", "Funny", "Adventurous"];
  const nouns = ["Cat", "Dog", "Penguin", "Elephant", "Lion"];
 
  const randomAdjective =
   adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
 
  return randomAdjective + randomNoun;
 }
 