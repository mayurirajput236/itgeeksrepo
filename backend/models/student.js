const {DataTypes}=require('sequelize');
const  sequelize=require('../config/database.js')
const Class = require('../models/class.js');
const Student=sequelize.define('student',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
    }
    
    

})
 Student.belongsTo(Class, { foreignKey: 'classId' });

module.exports=Student;