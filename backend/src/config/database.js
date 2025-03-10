module.exports = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'sports_reservation',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};