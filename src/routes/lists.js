// routes/shoppinglist.js

const router = require("express").Router()
const listController = require("../controllers/listController")

router.get('/', listController.getAllLists);
router.get('/:id', listController.getList);
router.post('/', listController.addItem);
router.delete('/:id', listController.deleteItem);
router.put('/:id', listController.updateItem);

module.exports = router;