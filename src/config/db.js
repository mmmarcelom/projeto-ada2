// config/db.js

require('dotenv').config()
const config = require('./config');

const { Client } = require('pg')

const connection = new Client(config.database);

connection.connect()
  .then(() => console.log('Conectado ao PostgreSQL no Render'))
  .catch(error => console.error('Error ao conectar com o PostgreSQL:', error));

module.exports = connection