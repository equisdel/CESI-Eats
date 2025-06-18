import Order from '../models/order.model.js';
import OrderMenu from '../models/orderMenu.js';
import  Menu  from '../models/menu.js';
import { Op } from 'sequelize';

const createOrder = async (req, res) => {
  try {
    const { client_id, delivery_address, total_price, menus } = req.body;

    // Étape 1 : Créer la commande (Order)
    const newOrder = await Order.create({
      client_id,
      delivery_address,
      total_price
    });

    // Étape 2 : Associer les menus (OrderMenu)
    if (menus && menus.length > 0) {
      const orderMenuEntries = menus.map(menu_id => ({
        order_id: newOrder.order_id,
        menu_id
      }));

      await OrderMenu.bulkCreate(orderMenuEntries);
    }

    res.status(201).json({ message: "Commande créée avec succès", order: newOrder });
  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


export const getPendingOrdersByRestaurant = async (req, res) => {
  const { restaurant_id } = req.params;
  console.log("👉 restaurant_id reçu :", restaurant_id); // ✅ Ajout ici

  try {
    const orders = await Order.findAll({
  include: [{
    model: OrderMenu,
    required: true, // 👈 important : obliger la présence d'une relation OrderMenu
    include: [{
      model: Menu,
      required: true, // 👈 important : obliger la présence d'un menu lié au restaurant
      where: { restaurant_id }
    }]
  }],
  where: {
    [Op.or]: [
      { accepted_by_restaurant: false },
      { accepted_by_restaurant: null }
    ]
  },
  distinct: true
});


    res.json(orders);
  } catch (err) {
      console.error('❌ Erreur SQL ou Sequelize:', err.message);

    console.error('Erreur lors de la récupération des commandes :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export default createOrder;
