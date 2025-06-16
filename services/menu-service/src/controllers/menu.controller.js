const Menu = require('../models/menu.model');
const Item = require('../models/item.model');
const MenuItem = require('../models/menu-item.model');

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
            return -1
        }
    }
    return sum;
}

async function addItemToMenu(item_id, menu_id) {
    const newMenuItem = await MenuItem.create({
        menu_id: menu_id,
        item_id: item_id
    })
}

const createMenu = async (req, res) => {    // restaurant user or business analyst
    // req has a body with the info of the new menu: either empty or with items, at least one
    try {
        const { role, restaurant_id, name, price, photo, description, items } = req.body
        if (role && (role=="restaurant" || role=="business_analyst")) {
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
                        return res.status(200).json({ msg: "New menu created succesfully!"})
                    } else {
                        await newMenu.destroy()
                        return res.status(400).json({ error: `Failed to create menu: unexistent/invalid item!`})
                    }
                };
            } else {
                return res.status(400).json({ error: `Failed to create menu: it must include at least one item!`})
            }
        } else {
            return res.status(403).json({ error: `Failed to create menu: unauthorized user!`})
        }
    } catch (error) {
        return res.status(400).json({ error: `Failed to authenticate user: ${error}`})
    }

}

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

const login = async (req, res) => {  // Changed to const definition
    const { type, mail, password } = req.body;
    try {
        const user = await getUser(type, mail);
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ mail: user.mail }, JWT_ACCESS_KEY, { expiresIn: JWT_TOKEN_LIFETIME });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging user:', error);
        return res.status(500).json({ error: `Failed to login user: ${error}` });
    }
}

module.exports = { createMenu, deleteMenu, authenticate };

