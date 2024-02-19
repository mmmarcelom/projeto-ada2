// models/userModel.js

const connection = require('../config/db');

class User {
  
  register(user) {
    const { name, login, password, salt } = user
    const query = `
      INSERT INTO users 
        (name, login, password, salt) 
      VALUES 
      ('${name}', '${login}', '${password}', '${salt}')
      RETURNING id;
    `
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        console.log(error)
        console.log(results)
        if (error) return reject(error)
        return resolve(results.rows[0].id)
      })
    })
  }

  getAllUsers(){
    const query = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) return reject(error)
        return resolve(results)
      })
    })
  }

  getUserByLogin(login){
    const query = `SELECT * FROM users WHERE login='${login}'`
    return new Promise((resolve, reject)=>{
      connection.query(query, (error, results) => {
        if(error) throw new Error('Database error')
        resolve(results.rows[0])
      })
    })
  }

  getUserById(id){
    const query = `SELECT * FROM users WHERE id=${id}`
    return new Promise((resolve, reject)=>{
      connection.query(query, (error, results) => {
        if(error) return reject(error)
        resolve(results)
      })
    })
  }

  removeUserById(id){
    const deleteQuery = `DELETE FROM users WHERE id=${id}`
    return new Promise((resolve, reject)=>{
      connection.query(query, (error, results) => {
        if(error) return reject(error)
        resolve(results)
      })
    })
  }

}

module.exports = User