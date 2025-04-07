import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('amazon-app', 'root', '1212', {
    host: 'localhost',
    dialect: 'mysql'
});

const Order = sequelize.define('Order', {
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    orderedItems: {
        type: DataTypes.JSON,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    placedAt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active'
    }
},{
    tableName: 'orders',
    freezeTableName: true,
    timestamps: false,
});

sequelize.sync({ alter: true}).then(()=>{
    console.log('Orders created successfully!');
}).catch((error)=>{
    console.log(`Error creating table: ${error}`);
});

sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(error => console.error(`Unable to connect to the database: ${error}`));

export default Order;