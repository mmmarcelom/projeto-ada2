// config/db.js

require('dotenv').config()
const { Client } = require('pg')

const connection = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL,
});

connection.connect()
  .then(() => console.log('Conectado ao PostgreSQL no Render'))
  .catch(error => console.error('Error ao conectar com o PostgreSQL:', error));

module.exports = connection