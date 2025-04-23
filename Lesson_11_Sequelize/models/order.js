const { DataTypes, Sequelize } = require('sequelize');
const sequelize= require('../util/database');

const Order= sequelize.define('order', {
      // Define model attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      }
    },
);
module.exports=Order;
