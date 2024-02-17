// models/List.js

const client = require("../config/db")

class List {
  constructor(id, name, owner_id, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.owner_id = owner_id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  async getLists() {
    const result = await client.query('SELECT * FROM lists');
    console.log('Executando getLists()...')
    console.log('Total de resultados: ', result.rowCount)
    
    return result.rows.map(
      row => 
        new List(
          row.id, 
          row.name,
          row.owner_id,
          new Date(row.createdat),
          new Date(row.createdat)
        )
    )
  }

  async getListById(id) {
    const result = await client.query(`SELECT * FROM lists WHERE id = ${id}`);
    console.log(`Executando getListById() com id ${id}...`)
    console.log('Total de resultados: ', result.rowCount)
    
    return result.rows.map(
      row => 
        new List(
          row.id, 
          row.name,
          row.owner_id,
          new Date(row.createdat),
          new Date(row.createdat)
        )
    )[0]
  }

}

module.exports = List;