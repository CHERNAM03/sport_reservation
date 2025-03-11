const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const databaseConfig = require('./config/database');
// const routes = require('./routes');

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
            </body>
        </html>
    `);
});

// Database connection
// databaseConfig.connect();

// Routes
// app.use('/api', routes);

// Start the server



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});