const menuController = require("../controllers/menu.controller");

module.exports = function(app) {

    // ON MENU
    app.post('/menu', menuController.createMenu);      // create a menu: ok -> impacts on menu-item
    app.get('/menu', menuController.getAllMenus);      // serch for menus
    app.get('/menu/restaurant/:id', menuController.getMenusByRestaurantId);  
    app.get('/menu/:id', menuController.getMenuById);
    app.delete('/menu/:id', menuController.deleteMenu);   // delete a menu: ok
    app.put('/menu/:id', menuController.updateMenu)       // modify a menu -> impacts on menu-item
    

}