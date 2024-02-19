// controllers/listController.js

const Item = require('../models/ItemModel');

const getAllItems = async (req, res) => {
    const list_id = req.params.id
    const itemModel = new Item()
    const items = await itemModel.getItemsFromList(list_id)
    res.status(200).json(items)
}

const addItem = async (req, res) => {
    const list_id = req.params.id
    const itemModel = new Item()

    const newItem = { ... req.body, list_id: list_id } 
    
    newItem.id = await itemModel.addItemToList(newItem)
    res.status(201).json(newItem)
}

const removeItem = async (req, res) => { 
    const itemModel = new Item()
    if(!await itemModel.removeItemFromList(req.params.id)) res.status(500).send("Error")
    res.status(200).send("Deleted")
}

const updateItem = async (req, res) => {
    const itemModel = new Item()
    const id = req.params.id
    console.log(id, req.body)

    const oldItem = await itemModel.getItemById(req.params.id)
    console.log(oldItem)

    let updatedItem = { ... oldItem, ... req.body } 
    console.log(updatedItem)
    if(!await itemModel.updateItemById(id, updatedItem)) return res.status(500).send("Error")
    res.status(202).send("Updated")

}

module.exports = { getAllItems, addItem, removeItem, updateItem }