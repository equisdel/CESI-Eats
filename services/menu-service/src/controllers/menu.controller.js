const Menu = require('../models/menu.model.js');
const Item = require('../models/item.model.js');
const MenuItem = require('../models/menu-item.model.js');

const ItemController = require('./item.controller.js')

// AUXILIAR FUNCTIONS

async function isValidMenu(menu_id, restaurant_id) {
    try {
        if (restaurant_id) {
            return await Menu.findOne({ where: {menu_id: menu_id, restaurant_id: restaurant_id} })
        } else {
            return await Menu.findOne({ where: {menu_id: menu_id} })
        }
    } catch {
        return null
    }
}

async function isValidItem(item_id, restaurant_id) {
    try {
        return await Item.findOne({ where: {item_id: item_id, restaurant_id: restaurant_id} })
    } catch {
        return null
    }
}

async function sumPrice(items,restaurant_id) {
    const sum = 0
    for (const i of items) {
        const item = isValidItem(i,restaurant_id)
        if (item) {
            sum += item.price
        } else {
            return -1   // uno de los items no es válido
        }
    }
    return sum;
}

async function addItemToMenu(item_id, menu_id) {
    try {
        const newMenuItem = await MenuItem.create({
            menu_id: menu_id,
            item_id: item_id
        })
        return res.status(200).json({ msg: "Item succesfully added to menu!", menu_item: newMenuItem }) 
    } catch (error) {
        return res.status(401).json({ error: `Error adding item to menu: ${error}`}) 
    }
}

// MENU CREATION

const createMenu = async (req, res) => {    // restaurant user or business analyst
    // req has a body with the info of the new menu: either empty or with items, at least one
    try {
        const { restaurant_id, name, price, photo, description, items } = req.body
        if (items.length > 0) {
            const newMenu = await Menu.create({
                restaurant_id: restaurant_id,
                menu_name: name,
                menu_price: price || sumPrice(items,restaurant_id),
                menu_photo: photo,
                menu_description: description
            });
            console.log('New menu added: ',newMenu.menu_id) 
            for (const item of items) {
                const i = await isValidItem(item,restaurant_id)
                if (i) {    // item exists and belongs to restaurant
                    await addItemToMenu(i.item_id,newMenu.menu_id)
                } else {
                    await newMenu.destroy()
                    return res.status(400).json({ error: `Failed to create menu: unexistent/invalid item!`})
                }
            };
            return res.status(200).json({ msg: "New menu created succesfully!"})
        } else {
            return res.status(400).json({ error: `Failed to create menu: it must include at least one item!`})
        }
    } catch (error) {
        return res.status(400).json({ error: `Failed to create menu: ${error}`})
    }
}

// MENU DELETION

const deleteMenu = async (req,res) => {
    try {
        const menu_id = req.params.id
        const { restaurant_id } = req.body
        const menu = isValidMenu(menu_id, restaurant_id)
        if (menu) {
            await menu.destroy()
            return res.status(201).json({ msg: "Menu deleted succesfully!"})
        } else {
            return res.status(403).json({ error: `Failed to delete menu: unauthorized user!`})
        }
    } catch {
        return res.status(400).json({ error: `Failed to delete menu: ${error}`})
    }
}

// MENU SEARCH

// for [1]: /menu/:menu_id
// for [2]: /menu//:restaurant_id
// for [3]: /menu/
const findMenus = async (req,res) => {

    const { menu_id, restaurant_id } = req.params
    const { limit, order, offset } = req.body       // add validators later?

    if (menu_id) {                  // search only one menu by its id
        try {
            return res.status(200).json(await Menu.findOne({ where: { menu_id: menu_id }}))
        } catch (error) {
            console.log("Error searching for menu:",error)
            return res.status(500).json({ error: "Menu Search error: Could not retrieve menu by ID" })
        }
    } 
    
    else if (restaurant_id) {     // search many menus from a restaurant
        try {
            return res.status(200).json(await Menu.findAll({ where: { restaurant_id: restaurant_id}, limit: limit, order: order, offset: offset }))
        } catch (error) {
            return res.status(500).json({ error: "Menu Search error: Could not retrieve menus for the specified restaurant" })
        }
    }

    else {                        // search all menus (use order/limit/offset to browse most popular, best qualified, nearest-by for example)
        try {
            return res.status(200).json(await Menu.findAll({ order: order, limit: limit, offset: offset }))
        } catch (error) {
            return res.status(500).json({ error: "Menu Search error: Could not retrieve menus" })
        }
    }

}

// MENU UPDATE

const updateMenu = async (req,res) => {

    const { id, name, price, description, photo, items } = req.body
    try {
        // search for menu: assume user has permission
        const menu = await Menu.findOne({ where: {menu_id: id} }) 
        if (menu) {

            // parameters empty if no modifications
            menu.menu_name = name ?? menu.menu_name
            menu.menu_price = price ?? menu.menu_price
            menu.menu_description = description ?? menu.menu_description
            menu.menu_photo = photo ?? menu.menu_photo
            await menu.save()

            if (items) {    // items empty if no modifications
                await MenuItem.destroy({ where: {menu_id: id}})  
                for (const item of items) {
                    await addItemToMenu(item, id)
                }
            }
        }
        return res.status(200).json({ message: "Menu updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: "Update Menu Error: Could not retrieve menu from DB" })
    }
}

module.exports = { createMenu, deleteMenu, findMenus, updateMenu };

