// controllers/listController.js

const ListItem = require('../models/ListItem');
const List = require('../models/List');

const getAllLists = async (req, res) => { 
  const listModel = new List()
  const lists = await listModel.getLists()
  console.log('Recebido no controller: ', lists)
  res.status(200).json(lists)
}

const getList = async (req, res) => { 
  const listModel = new List()
  const lists = await listModel.getListById(req.params.id)
  console.log('Recebido no controller: ', lists)
  res.status(200).json(lists)
}

const createList = (req, res) => { res.send('createList')}
const updateList = (req, res) => { res.send('updateList')}
const deleteList = (req, res) => { res.send('deleteList')}

const addItem = (req, res) => { res.send('addItem')}
const deleteItem = (req, res) => { res.send('deleteItem')}
const updateItem = (req, res) => { res.send('updateItem')}

module.exports = {
  getAllLists,
  getList,
  createList,
  updateList,
  deleteList,
  addItem,
  deleteItem,
  updateItem,
}