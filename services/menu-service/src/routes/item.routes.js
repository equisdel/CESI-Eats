const itemController = require("../controllers/item.controller");
const express = require('express')
const router = express.Router()

router.post('/', itemController.createItem);       // create a menu: ok -> impacts on menu-item
router.get('/', itemController.findItems);          // search menu/s: ok -> details go in query
router.delete('/:id', itemController.deleteItem);  // delete a menu: ok
router.put('/:id', itemController.updateItem);     // modify a menu:  -> impacts on menu-item

module.exports = router