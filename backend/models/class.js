const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Class = sequelize.define('Class', {
     className:{
        type: DataTypes.STRING,
        allowNull: false,
     }
});

module.exports = Class;
