// controllers/listController.js

const List = require('../models/ListModel');

const getAllLists = async (req, res) => { 
  const listModel = new List()
  const lists = await listModel.getLists()
  res.status(200).json(lists)
}

const createList = async (req, res) => { 
  const newList = { ... req.body } 
  const listModel = new List()
  
  newList.id = await listModel.createList(newList)
  res.status(201).json(newList)
}

const getList = async (req, res) => { 
  const listModel = new List()
  const list = await listModel.getListById(req.params.id)
  res.status(200).json(list)
}

const deleteList = async (req, res) => { 
  const listModel = new List()
  if(!await listModel.deleteListById(req.params.id)) res.status(500).send("Error")
  res.status(200).send("Deleted")
  
}

const updateList = async (req, res) => {
  const listModel = new List()
  const id = req.params.id

  const oldList = await listModel.getListById(req.params.id)
  let updatedList = { ... oldList, ... req.body } 
  
  if(!await listModel.updateListById(id, updatedList)) res.status(500).send("Error")
  res.status(202).send("Updated")

}

const addItem = (req, res) => { res.send('addItem not implemented')}
const deleteItem = (req, res) => { res.send('deleteItem not implemented')}
const updateItem = (req, res) => { res.send('updateItem not implemented')}

module.exports = {
  getAllLists,
  getList,
  createList,
  updateList,
  deleteList
}