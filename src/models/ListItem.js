// models/Item.js
class Item {
  constructor(id, itemName, quantity, listId, createdAt, updatedAt) {
    this.id = id;
    this.itemName = itemName;
    this.quantity = quantity;
    this.listId = listId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Item;