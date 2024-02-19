// server.js

// Inicializa o express
const express = require("express")
const app = express()

// Utiliza a variáveis de ambiente
require('dotenv').config()

// Permite utilizar os cookies para autenticação
app.use(require('cookie-parser')());

// Inicia o banco de dados
const db = require('./config/db')

// Permite receber requests apenas desses endereços
const corsOptions = { origin: "http://localhost:8081" }
app.use(require("cors")(corsOptions))

// Permite receber res.body
app.use(express.json()) 
app.use(express.urlencoded({ extended: true}))

// Adiciona a rota de autenticação ANTES do middleware global para checar token
app.use('/auth', require("./routes/auth.js"))

// Adiciona middleware global para checar JWT
const { checkToken } = require("./controllers/authController.js")
app.use(checkToken)

// Inicia as rotas
app.use('/lists', require("./routes/lists.js"))
app.get('/', (req, res)=> res.send('Home'))

const PORT = process.env.PORT_SERVER || 8080

app.listen(PORT, ()=>{ console.log(`Servidor iniciado: http://localhost:${PORT}/`) })