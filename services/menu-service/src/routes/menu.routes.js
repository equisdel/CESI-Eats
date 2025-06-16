const menuController = require("../controllers/menu.controller");
const express = require('express')
const router = express.Router()

router.post('/', menuController.createMenu);        // create a menu: ok -> impacts on menu-item
router.get('/', menuController.findMenus);          // search menu/s: ok -> details go in query
router.delete('/:id', menuController.deleteMenu);  // delete a menu: ok
router.put('/:id', menuController.updateMenu);     // modify a menu:  -> impacts on menu-item

module.exports = router