// routes/shoppinglist.js

const router = require("express").Router()
const listController = require("../controllers/listController")

router.get('/', listController.getAllLists)
router.post('/', listController.createList)
router.get('/:id', listController.getList)
router.delete('/:id', listController.deleteList)
router.put('/:id', listController.updateList)

module.exports = router;