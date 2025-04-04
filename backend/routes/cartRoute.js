import express from 'express';
import { addCartItem, deleteCartItem, loadCartItems, updateDeliveryOptionId, updateQuantity } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.get('/', loadCartItems);
cartRouter.post('/', addCartItem);
cartRouter.patch('/updateQuantity', updateQuantity);
cartRouter.patch('/updateDeliveryOptionId', updateDeliveryOptionId);
cartRouter.delete('/', deleteCartItem);

export default cartRouter;