// server.js

// Inicializa o express
const express = require("express")
const app = express()

// Carrega as variáveis de ambiente
const dotenv = require('dotenv')
dotenv.config() 

// Carrega as configurações
const config = require('./config/config') 

// Inicia o banco de dados
const db = require('./config/db') 

app.use(require('cookie-parser')()) // Permite utilizar os cookies para autenticação
app.use(require("cors")({ origin: config.allowedOrigins })) // Permite receber requests apenas desses endereços
app.use(express.json()) // Permite receber json do res.body
app.use(express.urlencoded({ extended: true})) // Permite receber url-encoded do res.body

// Adiciona a rota de autenticação ANTES do middleware global para checar token
app.use('/auth', require("./routes/auth.js"))

// Adiciona middleware global para checar JWT
const { checkToken } = require("./controllers/authController.js")
app.use(checkToken)

// Inicia as rotas
app.use('/lists', require("./routes/lists.js"))

const PORT = process.env.PORT_SERVER || 8080

app.listen(config.port, ()=>{ console.log(`Servidor iniciado: http://localhost:${PORT}/`) })