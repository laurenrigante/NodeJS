const { DataTypes } = require('sequelize');
const sequelize= require('../util/database');

const CartItem= sequelize.define('cartItem', {
      // Define model attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
);
module.exports=CartItem;
