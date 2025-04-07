import  Order  from "../modules/orderModule.js";


export async function placeOrder(req, res){
    console.log('Received POST /orders with body:', req.body);

    try {
        const { orderedItems, totalPrice, placedAt } = req.body;
        await Order.create({  orderedItems, totalPrice, placedAt });
        res.status(200).json({message: 'Order Placed Successfully!'});
    }catch(error){
        console.error(`Error querying database:  ${error}`);
        res.status(500).send('Database error');
    }
}

export async function loadAllOrders(req, res){
    try {
      const orders = await Order.findAll({
        order: [['orderId', 'DESC']] 
      });
      res.json(orders);
    } catch (error) {
      console.error(`Error querying database:  ${error}`);
      res.status(500).send('Database error');
    }
}

export async function cancelOrder(req, res){
    try{
        const orderId = req.params.id;
        const { status }  = req.body;
        const cancelledOrder = await Order.findOne({ where: { orderId } });
        if (cancelledOrder) {
            await cancelledOrder.update({ status });
            res.json({message: 'Order Cancelled!'});
        } else {
            res.status(404).json({ message: 'Order not found!' });
        }
    }catch(error) {
        console.error(`Error cancelling the order: ${error}`);
        res.status(500).json({ message: 'Failed to cancel order!' });
    }
}