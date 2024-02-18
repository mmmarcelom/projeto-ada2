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
    const query = 'SELECT * FROM lists'
    const result = await client.query(query);
    
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

  async createList(newList) {
    const query = `INSERT INTO lists (name, owner_id) values ('${newList.name}', ${newList.owner_id}) RETURNING id`
    const result = await client.query(query)
    
    return result.rows[0].id
  }

  async getListById(id) {
    const query = `SELECT * FROM lists WHERE id = ${id}`
    const result = await client.query(query)
    
    const resultList = result.rows.map(
      row => 
        new List(
          row.id, 
          row.name,
          row.owner_id,
          new Date(row.createdat),
          new Date(row.createdat)
        )
    )[0]

    return resultList
  }

  async deleteListById(id) {
    const query = `DELETE FROM lists WHERE id = ${id}`
    const result = await client.query(query)
    if(result.rowCount > 1) throw new Error('Deleted more than one ID.');
    if(result.rowCount == 0) return false
    return true
  }

  async updateListById(id, updatedList){
   
    const query = `
    UPDATE lists 
    SET name = '${updatedList.name}', owner_id = ${updatedList.owner_id}
    WHERE id = ${id}
    `
    const result = await client.query(query)

    if(result.rowCount > 1) throw new Error('Updated more than one ID.');
    if(result.rowCount == 0) return false
    return true
  }

}

module.exports = List;