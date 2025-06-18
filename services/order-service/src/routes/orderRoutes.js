import express from 'express';
import  createOrder, {
  getPendingOrdersByRestaurant,
  acceptOrder,getAcceptedOrdersByRestaurant
}  from '../controllers/orderController.js'; // ✅ importer les deux

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/pending/:restaurant_id', getPendingOrdersByRestaurant); // ✅ route GET
router.put('/orders/accept/:id', acceptOrder); // ✅ nouvelle route
router.get('/orders/preparing/:restaurant_id', getAcceptedOrdersByRestaurant); // ✅ nouvelle route

export default router;
