// controller/authController.js

const UserModel = require('../models/UserModel')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
  const accessToken = req.cookies.access_token

  if(!accessToken) return res.sendStatus(403)
 
  try {
    jwt.verify(accessToken, process.env.PRIVATE_KEY)
    next()
  } catch (error) { return res.sendStatus(403) }
}

const checkCredentials = async (req, res, next) => {
  const userModel = new UserModel()
  try{
      req.user = await userModel.getUserByLogin(req.headers.login)
      if(!req.user) return res.status(401).send('Usuário não existe')
      
      typedPassword = req.headers.password
      userHashedPassword = req.user.password
      userSalt = req.user.salt

      if(!checkPassword(typedPassword, userHashedPassword, userSalt)) return res.status(401).send('Senha incorreta') 
      next()
    } catch(e) { return res.status(500).json({ error: e.message }) }
}

function checkPassword(typedPassword, userHashedPassword, userSalt){
  const hashFromTypedPassword = crypto.createHash('sha256').update(typedPassword + userSalt).digest('hex');
  return hashFromTypedPassword === userHashedPassword
}

const getToken = (req, res) => {
    const accessToken = jwt.sign({ id: req.user.id, name: req.user.name }, process.env.PRIVATE_KEY, { expiresIn: '1h' })

    res
    .cookie("access_token", accessToken, { httpOnly: true, secure: false })
    .cookie("name", req.user.name, { httpOnly: true, secure: false })
    .status(200)
    .json({ message: "Logado com sucesso" });

    console.log(`${req.user.name} logou no sistema.`)
}

const eraseToken = (req, res) => {
    res.clearCookie("access_token").status(200).json({ message: "Logout realizado" });
}

module.exports = { checkCredentials, getToken, eraseToken, checkToken }