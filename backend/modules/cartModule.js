import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('amazon-app', 'root', '1212', {
    host: 'localhost',
    dialect: 'mysql'
});

const CartItem = sequelize.define('CartItem', {
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deliveryOptionId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '1'
    }
},{
    tableName: 'cartItems'
});

sequelize.sync({ alter: true}).then(()=>{
    console.log('CartItems table created successfully!');
}).catch((error)=>{
    console.log(`Error creating table: ${error}`);
});

export default CartItem;