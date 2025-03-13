const path = require('path');

// Set path to project root by going up 3 levels from current file
const projectRoot = path.resolve(__dirname, '../../../');
require('dotenv').config({ 
    path: path.resolve(projectRoot, `.env.${process.env.NODE_ENV || 'debugging'}`)
});

console.log('Environment:', process.env.NODE_ENV );

// Add debug logging to check environment variables
console.log('Environment Variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT
  });

const config = {
    env: process.env.NODE_ENV || 'debugging',
    port: process.env.PORT || 5000,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT, 10)
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    urls: {
        api: process.env.API_URL,
        client: process.env.CLIENT_URL
    }
};

module.exports = configDict = config;