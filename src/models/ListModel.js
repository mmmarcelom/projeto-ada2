// models/ListModel.js

const connection = require("../config/db")

class List {
  constructor(id, name, owner_id, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.owner_id = owner_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  async getLists() {
    const query = 'SELECT * FROM lists'
    const result = await connection.query(query);
    
    return result.rows.map(
      row => 
        new List(
          row.id, 
          row.name,
          row.owner_id,
          new Date(row.created_at),
          new Date(row.created_at)
        )
    )
  }

  async createList(newList) {
    const query = `INSERT INTO lists (name, owner_id) values ('${newList.name}', ${newList.owner_id}) RETURNING id`
    const result = await connection.query(query)
    
    return result.rows[0].id
  }

  async getListById(id) {
    const query = `SELECT * FROM lists WHERE id = ${id}`
    const result = await connection.query(query)
    
    const resultList = result.rows.map(
      row => 
        new List(
          row.id, 
          row.name,
          row.owner_id,
          new Date(row.created_at),
          new Date(row.created_at)
        )
    )[0]

    return resultList
  }

  async deleteListById(id) {
    const query = `DELETE FROM lists WHERE id = ${id}`
    const result = await connection.query(query)
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
    const result = await connection.query(query)

    if(result.rowCount > 1) throw new Error('Updated more than one ID.');
    if(result.rowCount == 0) return false
    return true
  }

}

module.exports = List;