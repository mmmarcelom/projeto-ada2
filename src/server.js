// server.js

// Inicializa o express
const express = require("express")
const app = express()

// Utiliza a variáveis de ambiente
require('dotenv').config()

// Inicia o banco de dados
const db = require('./config/db')

// Permite receber requests apenas desses endereços
const cors = require("cors")
const corsOptions = { origin: "http://localhost:8081" }
app.use(cors(corsOptions))

// Receber res.body
app.use(express.json()) 
app.use(express.urlencoded({ extended: true}))

// Inicia as rotas
app.use('/lists', require("./routes/lists.js"))
app.get('/', (req, res)=> res.send('Home'))

const PORT = process.env.PORT_SERVER || 8080

app.listen(PORT, ()=>{ console.log(`Servidor iniciado: http://localhost:${PORT}/`) })