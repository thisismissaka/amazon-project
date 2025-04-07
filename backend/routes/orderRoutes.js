import express from 'express';
import { placeOrder, loadAllOrders, cancelOrder } from '../controllers/ordersController.js';

const orderRouter = express.Router();

orderRouter.get('/', loadAllOrders);
orderRouter.post('/', placeOrder);
orderRouter.patch('/:id', cancelOrder);

export default orderRouter;