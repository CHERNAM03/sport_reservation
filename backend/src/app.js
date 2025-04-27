
/* const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const groundRouter = require('./routes/groundRoutes');
const User = require('./models/UsersModel'); // Assurez-vous que le chemin est correct
const protectedRoutes = require('./routes/protectedRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { database } = require('./models'); // Importez la base de données depuis index.js
const avisRoutes = require('./routes/avisRoutes');
const path = require('path');
const cleanExpiredReservations = require('./cron/reservationCleaner');
const http = require('http'); // Importez le module HTTP
const { Server } = require('socket.io'); // Importez socket.io

const app = express();
const server = http.createServer(app); // Créez un serveur HTTP
const io = new Server(server); // Attachez socket.io au serveur HTTP
const PORT = process.env.PORT || 5000;

// Middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Autorisez votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Exécutez la tâche planifiée
cleanExpiredReservations();
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const groundRouter = require('./routes/groundRoutes');
const User = require('./models/UsersModel');
const protectedRoutes = require('./routes/protectedRoutes');
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const { database } = require('./models');
const avisRoutes = require('./routes/avisRoutes');
const path = require('path');
const cleanExpiredReservations = require('./cron/reservationCleaner');
const http = require('http');
const { Server } = require('socket.io');
const socketManager = require('./socketManager');
const testRoutes = require('./routes/testRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');



// Création de l'application Express
const app = express();
const server = http.createServer(app);


// Configuration de Socket.io avec CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Autorisez votre frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;
// Routes de test
app.use('/api/test', testRoutes);

// Middleware
app.use('/images', express.static(path.join(__dirname, 'public/images')));
// Une seule déclaration CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Exécutez la tâche planifiée
cleanExpiredReservations();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grounds', groundRouter);

// Routes protégées
app.use('/api/protected', protectedRoutes);

// Routes pour les utilisateurs
app.use('/api/users', userRoutes);

// Routes pour les réservations
app.use('/api/reservations', reservationRoutes);
app.use('/api/test', testRoutes);
app.use('/api/avis', avisRoutes);

// Routes pour les statistiques
app.use('/api/statistics', statisticsRoutes);

// Logging des routes enregistrées
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`Route enregistrée : ${middleware.route.path}`);
  }
});

// Add Hello World route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Hello World </title>
            </head>
            <body>
                <h1>Hello World!</h1>
                <p>Welcome to the cheikh App</p>
                <p>Welcome to the cheikh 1 App</p>
            </body>
        </html>
    `);
});



// Ajouter un utilisateur par défaut lors de l'initialisation
const createDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ where: { email: 'admin@example.com' } });

    if (!existingUser) {
      const defaultUser = await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: 'adminpassword', // Le mot de passe sera automatiquement haché
        role: 'admin'
      });

      console.log('Utilisateur par défaut créé :', defaultUser);
    } else {
      console.log('L\'utilisateur par défaut existe déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur par défaut :', error.message);
  }
};

createDefaultUser();

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('✅ Database & tables created!');
  });

database.sync({ force: false }) // Utilisez `force: true` pour recréer les tables (attention : cela supprime les données existantes)
  .then(() => {
    console.log('✅ Synchronisation des modèles réussie.');
  })
  .catch((err) => {
    console.error('❌ Erreur lors de la synchronisation des modèles :', err.message);
  });

sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Synchronisation des modèles réussie.');
  })
  .catch((err) => {
    console.error('❌ Erreur lors de la synchronisation des modèles :', err.message);
  });

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('Un client est connecté avec ID:', socket.id);

  // Pour déboguer les événements socket
  socket.onAny((event, ...args) => {
    console.log(`Événement reçu: ${event}`, args);
  });

  socket.on('customEvent', (data) => {
    console.log('Événement personnalisé reçu :', data);
  });

  socket.emit('welcome', { message: 'Bienvenue sur le serveur WebSocket !' });

  socket.on('disconnect', () => {
    console.log('Client déconnecté:', socket.id);
  });
});

socketManager.initialize(io);

// Démarrez le serveur
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exportez app, io et server pour les utiliser dans d'autres fichiers
module.exports = { app, io, server };