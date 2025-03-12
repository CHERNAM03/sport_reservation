const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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


// Create database connection
// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connection established successfully.');
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });

// Routes
//app.use('/api/auth', authRoutes);

// Start the server



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});