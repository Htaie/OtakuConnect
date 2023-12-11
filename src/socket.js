import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const app = express()
app.use(cors())

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
})

const connectedUsers = {}
const PORT = process.env.PORT || 3001

io.on('connection', (socket) => {
  const randomNickname = generateRandomNickname()

  const user = {
    socket: socket,
    nickname: randomNickname,
    likedAnime: [],
  }
  connectedUsers[socket.id] = user
  console.log(`User connected: ${randomNickname}`)

  updateUsersList()
  console.log(`Пользователь ${connectedUsers[socket.id].nickname} подключился`)

  socket.on('userArray', (serializedData) => {
    connectedUsers[socket.id].likedAnime = serializedData.likedAnime
    compareLikedAnime(connectedUsers[socket.id])
  })

  socket.on('disconnect', () => {
    console.log(`Пользователь ${connectedUsers[socket.id].nickname} отключился`)

    delete connectedUsers[socket.id]
    updateUsersList()
  })

  socket.on('updateLikedList', (updateLikedList) => {
    connectedUsers[socket.id].likedAnime = updateLikedList

    compareLikedAnime(connectedUsers[socket.id])

    updateUsersList()
  })

  function compareLikedAnime(currentUser) {
    Object.values(connectedUsers).forEach((otherUser) => {
      if (otherUser.socket.id === currentUser.socket.id) {
        return
      }

      const match = currentUser.likedAnime.find((anime1) =>
        otherUser.likedAnime.some((anime2) => anime1.id === anime2.id)
      )

      if (match) {
        currentUser.socket.emit('matchingAnime', {
          nickname: otherUser.nickname,
          image: match.image,
          name: match.name,
        })
        otherUser.socket.emit('matchingAnime', {
          nickname: currentUser.nickname,
          image: match.image,
          name: match.name,
        })
      }
    })
  }

  function updateUsersList() {
    const usernames = Object.values(connectedUsers).map((u) => u.nickname)
    io.emit('userList', usernames)
  }
})

server.listen(PORT, () => {
  console.log('Listening app dev:' + PORT)
})

function generateUniqueId() {
  return Math.random().toString(36).substring(7)
}

function generateRandomNickname() {
  const adjectives = [
    'New',
    'Old',
    'Skilled',
    'Loser',
    'Best',
    'Worst',
    'Cringe',
    'Roflan',
    'Super',
    'Gay',
    'Freaky',
    'Lazy',
    'Lesbian',
    'Black',
  ]
  const nouns = [
    'Otaku',
    'Hikki',
    'Anime guy',
    'Clown',
    'King',
    'Swordsman',
    'Anime girl',
    'Lady',
    'Gentleman',
    'Prince',
    'Philosopher',
    'Dreamer',
    'Adventurer',
    'Maverick',
  ]

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]

  return randomAdjective + ' ' + randomNoun
}
