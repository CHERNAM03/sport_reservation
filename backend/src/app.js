const express = require('express');
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


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`Requête reçue : ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ground', groundRouter);

// Routes protégées
app.use('/api/protected', protectedRoutes);

// Routes pour les utilisateurs
app.use('/api/users', userRoutes);

// Routes pour les réservations
app.use('/api/reservations', reservationRoutes);
app.use('/api/avis', avisRoutes);
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


//Ajouter un utilisateur par défaut lors de l'initialisation

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
// Create database connection
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
// Synchronize models with the database
  sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Synchronisation des modèles réussie.');
  })
  .catch((err) => {
    console.error('❌ Erreur lors de la synchronisation des modèles :', err.message);
  });
// Start the server



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});