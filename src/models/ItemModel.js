// models/ItemModel.js

const client = require("../config/db")

class Item {
  constructor(id, name, quantity, list_id, created_at, updated_at) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.list_id = list_id;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  async getItemsFromList(id) {
    const query = `
    SELECT 
      * 
    FROM items 
    WHERE list_id = ${id}`
    
    const result = await client.query(query);
    
    return result.rows.map(
      row => 
        new Item(
          row.id, 
          row.name,
          row.quantity,
          new Date(row.created_at),
          new Date(row.created_at)
        )
    )
  }

  async addItemToList(newItem) {
    const query = `INSERT INTO items (name, quantity, list_id ) values ('${newItem.name}', ${newItem.quantity}, ${newItem.list_id}) RETURNING id`
    const result = await client.query(query)
    
    return result.rows[0].id
  }

  async removeItemFromList(id) {
    const query = `DELETE FROM items WHERE id = ${item_id}`
    const result = await client.query(query)
    if(result.rowCount > 1) throw new Error('Deleted more than one ID.');
    if(result.rowCount == 0) return false
    return true
  }

  async getItemById(id) {
    const query = `
    SELECT 
      * 
    FROM items 
    WHERE id = ${id}`

    const result = await client.query(query);
    console.log(result)
    return result.rows.map(
      row => 
        new Item(
          row.id, 
          row.name,
          row.quantity,
          new Date(row.created_at),
          new Date(row.created_at)
        )
    )
  }

  async updateItemById(id, updatedItem){
  
    const query = `
    UPDATE items 
    SET name = '${updatedItem.name}', quantity = ${updatedItem.quantity}
    WHERE id = ${id}
    `
    const result = await client.query(query)

    if(result.rowCount > 1) throw new Error('Updated more than one ID.');
    if(result.rowCount == 0) return false
    return true
  }

}

module.exports = Item;