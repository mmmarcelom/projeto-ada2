// routes/lists.js

const router = require("express").Router()
const listController = require("../controllers/listController")
const itemController = require("../controllers/itemController")

router.get('/', listController.getAllLists)
router.post('/', listController.createList)
router.get('/:id', listController.getList)
router.delete('/:id', listController.deleteList)
router.put('/:id', listController.updateList)

router.get('/:id/items', itemController.getAllItems)
router.post('/:id/items', itemController.addItem)
router.delete('/items/:id', itemController.removeItem)
router.put('/items/:id', itemController.updateItem)

module.exports = router;