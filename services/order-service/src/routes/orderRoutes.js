import express from 'express';
import createOrder, { getPendingOrdersByRestaurant } from '../controllers/orderController.js'; // ✅ importer les deux

const router = express.Router();

router.post('/orders', createOrder);
router.get('/orders/pending/:restaurant_id', getPendingOrdersByRestaurant); // ✅ route GET

export default router;
