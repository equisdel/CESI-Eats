const itemController = require("../controllers/item.controller");

module.exports = function(app) {
    // ON ITEM
    app.get('/item', itemController.getAllMenus);   
    app.post('/item', itemController.createMenu);    
    app.get('/item/:id', itemController.getMenuById); 
    app.put('/item/:id', itemController.updateMenu);  
    app.delete('/item/:id', itemController.deleteMenu);
}