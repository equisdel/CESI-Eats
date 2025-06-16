const Item = require('../models/item.model.js');

// AUXILIAR FUNCTIONS

// could move: sum of items price and isValid to here (see how to export for the other controller)

async function isValidItem(item_id, restaurant_id) {
    try {
        return await Item.findOne({ where: {item_id: item_id, restaurant_id: restaurant_id} })
    } catch {
        return null
    }
}


// ITEM CREATION

const createItem = async (req, res) => {    // restaurant user or business analyst
    // req has a body with the info of the new item
    try {
        const { restaurant_id, name, price, photo, ingredients } = req.body
        // el usuario está habilitado para agregar en este restaurante? gateway -> no traigas el rol

        const newItem = await Item.create({
            restaurant_id: restaurant_id,
            item_name: name,
            item_price: price,
            item_photo: photo,
            item_ingredients: ingredients
        });
        console.log('New menu added: ',newItem.item_id) 
        return res.status(201).json({ msg: "New item created succesfully!"})

    } catch (error) {
        return res.status(500).json({ error: `Failed to create item: ${error}`})
    }

}

// ITEM DELETION

const deleteItem = async (req,res) => {
    try {
        const item_id = req.params.id
        // const { restaurant_id } = req.body -- permissions in gateway
        const item = await isValidItem(item_id)
        if (item) {
            await item.destroy()
            return res.status(200).json({ msg: "Item deleted succesfully!"})
        }
    } catch (error) {
        return res.status(500).json({ error: `Failed to delete menu: ${error}`})
    }
}

// ITEM SEARCH

// GET /item/:item_id/:menu_id/:restaurant_id
// Examples:
//   /item                  -> search all items 
//   /item?item_id=1        -> search an item by id
//   /item?menu_id=2        -> search all items of a menu
//   /item?restaurant_id=1  -> search all items of a restaurant
const findItems = async (req,res) => {

    const { item_id, menu_id, restaurant_id, limit, order, offset } = req.query

    try {

        const where = {};
        if (item_id) where.item_id = item_id;
        if (menu_id) where.menu_id = menu_id;
        if (restaurant_id) where.restaurant_id = restaurant_id;

        const items = await Item.findAll({
            where,
            limit: limit ? parseInt(limit) : 10,
            order: order ? [['item_name', order]] : [['item_name', 'ASC']], // default order
            offset: offset ? parseInt(offset) : 0
        });
        return res.status(200).json(items);

    } catch (error) {
        return res.status(500).json({ error: "Failed to search items", details: error.message });
    }

}

// MENU UPDATE

const updateItem = async (req,res) => {

    const { id, name, price, ingredients, photo, items } = req.body
    try {
        // search for menu: assume user has permission
        const item = await Item.findOne({ where: {item_id: id} }) 
        if (item) {

            // parameters empty if no modifications
            item.item_name = name ?? item.item_name
            item.item_price = price ?? item.item_price
            item.item_ingredients = ingredients ?? item.item_ingredients
            item.item_photo = photo ?? item.item_photo
            await item.save()

        } else return res.status(404).json({ error: "Update Item Error: Item not found" });
        return res.status(200).json({ message: "Item updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Update Item Error: Could not retrieve item from DB" })
    }
}

module.exports = { createItem, deleteItem, findItems, updateItem };

