import  CartItem  from "../modules/cartModule.js";

export async function addCartItem(req, res){
    try {
        const { productId, quantity, deliveryOptionId } = req.body;

        const existingItem = await CartItem.findOne({where: { productId }});

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;
            await existingItem.update({ quantity: newQuantity });
        } else {
            await CartItem.create({ productId, quantity, deliveryOptionId });
        }
        const cartItems = await CartItem.findAll();
        res.json(cartItems);

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Failed to add product!" });
    }
}

export async function loadCartItems(req, res){
    try {
      const cartItems = await CartItem.findAll();
      res.json(cartItems);
    } catch (error) {
      console.error(`Error querying database:  ${error}`);
      res.status(500).send('Database error');
    }
}

export async function updateDeliveryOptionId(req, res){
    try {
        const { productId, deliveryOptionId } = req.body;

        const item = await CartItem.findOne({ where: { productId } });
        if (!item) return res.status(404).json({ message: 'Item not found!' });

        await item.update({ deliveryOptionId });
        const cartItems = await CartItem.findAll();
        res.json(cartItems);
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ message: 'Update failed' });
    }
}

export async function updateQuantity(req, res){
    try {
        const { productId, quantity } = req.body;

        const item = await CartItem.findOne({ where: { productId } });
        if (!item) return res.status(404).json({ message: 'Item not found!' });

        await item.update({ quantity });
        const cartItems = await CartItem.findAll();
        res.json(cartItems);
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ message: 'Update failed' });
    }
}

export async function deleteCartItem(req, res){
    try{
        const { productId }  = req.body;
        const deletedRows = await CartItem.destroy({where: productId ? {productId}: {}});
        if (deletedRows > 0) {
            const cartItems = await CartItem.findAll();
            res.json(cartItems);
        } else {
            res.status(404).json({ message: 'Cart item not found!' });
        }
    }catch(error) {
        console.error(`Error deleting cart item: ${error}`);
        res.status(500).json({ message: 'Failed to delete cart item!' });
    }
}