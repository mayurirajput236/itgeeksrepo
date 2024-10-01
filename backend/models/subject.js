const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Subject = sequelize.define('Subject', {
     SubjectName:{
        type: DataTypes.STRING,
        allowNull: false,
     }
});

module.exports = Subject;
