import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import secret from './config.js';
import User from './models/User.js';
import Role from './models/Role.js';
import roleMiddleware from './middleware/roleMiddleware.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', async function (req, res) {
  try {
    await authCtrl.login(req, res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Login Client Error' });
  }
});

app.post(
  '/register',
  [
    check('login', 'Логин пользователя не может быть пустым').notEmpty(),
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({ min: 4, max: 10 }),
  ],
  async function (req, res) {
    console.log('Request Body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { login, username, password } = req.body;
      console.log('Login:', login);
      console.log('Name:', username);
      console.log('Password:', password);
      await authCtrl.registration(req, res);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: 'Register Client Error' });
    }
  }
);

app.patch('/edit', async function (req, res) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.id;

    await authCtrl.editProfile(req, res, userId);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Edit Profile Client Error' });
  }
});

app.get('/users', roleMiddleware(['ADMIN']), async function (req, res) {
  try {
    await authCtrl.getUsers(req, res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const connectedUsers = {};
const PORT = process.env.PORT || 3001;

io.on('connection', (socket) => {
  const randomNickname = generateRandomNickname();

  const user = {
    socket,
    nickname: randomNickname,
    likedAnime: [],
  };
  connectedUsers[socket.id] = user;
  console.log(`User connected: ${randomNickname}`);

  updateUsersList();
  console.log(`Пользователь ${connectedUsers[socket.id].nickname} подключился`);

  socket.on('userArray', (serializedData) => {
    connectedUsers[socket.id].likedAnime = serializedData.likedAnime;
    compareLikedAnime(connectedUsers[socket.id]);
  });

  socket.on('disconnect', () => {
    console.log(`Пользователь ${connectedUsers[socket.id].nickname} отключился`);

    delete connectedUsers[socket.id];
    updateUsersList();
  });

  socket.on('updateLikedList', (updateLikedList) => {
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
        currentUser.socket.emit('matchingAnime', {
          nickname: otherUser.nickname,
          image: match.image,
          name: match.name,
        });
        otherUser.socket.emit('matchingAnime', {
          nickname: currentUser.nickname,
          image: match.image,
          name: match.name,
        });
      }
    });
  }

  function updateUsersList() {
    const usernames = Object.values(connectedUsers).map((u) => u.nickname);
    io.emit('userList', usernames);
  }
});

server.listen(PORT, () => {
  console.log('Listening app dev:' + PORT);
});
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
  ];
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
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return randomAdjective + ' ' + randomNoun;
}

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

async function connectToMongoDB() {
  await mongoose.connect(
    'mongodb+srv://Otaku:Otaku123@cluster0.bqlzraq.mongodb.net/auth_roles?retryWrites=true&w=majority'
  );
}

connectToMongoDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

class AuthController {
  async login(req, res) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${login} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль' });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token, username: user.username });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async registration(req, res) {
    try {
      const { login, username, password } = req.body;
      const candidate = await User.findOne({ login });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({
        login,
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async editProfile(req, res, userId) {
    try {
      const { newNickname, currentPassword, newPassword } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${userId} не найден` });
      }

      const validPassword = currentPassword ? bcrypt.compareSync(currentPassword, user.password) : true;

      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный текущий пароль` });
      }

      if (newNickname) {
        user.username = newNickname;
      }

      if (newPassword) {
        const hashPassword = bcrypt.hashSync(newPassword, 7);
        user.password = hashPassword;
      }

      await user.save();

      return res.json({ message: 'Данные пользователя успешно обновлены' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Edit Profile error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

const authCtrl = new AuthController();
