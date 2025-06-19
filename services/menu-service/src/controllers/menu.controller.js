const Menu = require('../models/menu.model.js');
const Item = require('../models/item.model.js');
const MenuItem = require('../models/menu-item.model.js');

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

async function isValidItem(item_id) {
    try {
        console.log(item_id,"!!!!")
        return await Item.findOne({ where: {item_id: item_id} })
    } catch (error) {
        console.log(error,"_ALDÑLS")
        return {"msg": error}
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
        return await MenuItem.create({
            menu_id: menu_id,
            item_id: item_id
        })
    } catch (error) {
        console.log(error)
        throw error
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
                menu_price: price, // || sumPrice(items,restaurant_id),
                menu_photo: photo,
                menu_description: description
            });
            console.log('New menu added: ',newMenu.menu_id) 
            for (const item of items) {
                const i = await isValidItem(item)
                console.log(i)
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
const findMenus = async (req,res) => {

    console.log("xd")
    const { menu_id, restaurant_id, limit, order, offset, items,photo } = req.query

    try {
        const where = {};
        if (menu_id) where.menu_id = menu_id;
        if (restaurant_id) where.restaurant_id = restaurant_id;

        const menus = await Menu.findAll({
            where: where,
            limit: limit ? parseInt(limit) : 10,
            order: order ? [['menu_name', order]] : [['menu_name', 'ASC']], // default order
            offset: offset ? parseInt(offset) : 0
        });
        
        if (items && items=="1") {    // adds array of items that compose each menu

            for (const menu of menus) {
                menu.dataValues.items = []; 
                const menuItems = await MenuItem.findAll({ where: { menu_id: menu.menu_id } });
                for (const menuItem of menuItems) {
                    const item = await Item.findOne({ where: { item_id: menuItem.item_id } });
                    if (item) {
                        menu.dataValues.items.push({
                            item_id: item.item_id,
                            item_name: item.item_name,
                            item_price: item.item_price
                        });
                    }
                }
            }
        }
        return res.status(200).json(menus);
    } catch (error) {
        return res.status(500).json({ error: "Failed to search menus", details: error.message });
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

