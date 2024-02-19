const UserModel = require('../models/UserModel')
const crypto = require('crypto');

async function validate(req, res, next){
    req.user = { ...req.body }
    
    // Check if request has all attributes
    const requiredFields = [ 'name', 'login', 'password']
    const missingFields = []
    
    requiredFields.forEach(field => {
        if(!req.user.hasOwnProperty(field))
            missingFields.push(field)
    })

    if(missingFields.length > 0) 
        return res.status(400).json({ 
            'error': 'missingFields', 
            'missingFields': missingFields.join(', ') 
        })

    // Check if user already exists
    const userModel = new UserModel()
    try {
        const user = await userModel.getUserByLogin(req.user.login)
        if(user) return res.status(400).json({ 'error': 'User already exists' })
    } catch(e) { return res.status(500).json({ error: e.message }) }
    
    next()
}

function encryptPassword(req, res, next){
    
    req.user.salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
        .createHash('sha256')
        .update(req.user.password + req.user.salt)
        .digest('hex')
    
    req.user.password = hash

    next()
}

async function register(req, res, next){
    const userModel = new UserModel()
    try {
        req.user.id = await userModel.register(req.user)
        next()
    } catch(e) { return res.status(500).json({ error: e.message }) }

}

module.exports = { validate, encryptPassword, register }