// auth.js
const router = require("express").Router()
const { checkCredentials, getToken, eraseToken } = require('../controllers/authController')
const { validate, encryptPassword, register } = require('../controllers/registerController')

router.post('/register', validate, encryptPassword, register, getToken)
router.get('/login', checkCredentials, getToken)
router.get('/logout', eraseToken)

module.exports = router;