// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database.js');
// const Class=require('../models/class.js')
// const Teacher = sequelize.define('Teacher', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     subject: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// });

// // Teacher.hasMany(Class, { foreignKey: 'teacherId' });
// // Class.belongsTo(Teacher, { foreignKey: 'teacherId' });



// module.exports = Teacher;
const {  DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database.js');
const Class = require('../models/class.js');
const Subject=require('../models/subject.js')
const Teacher = sequelize.define('Teacher', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
});
Teacher.belongsTo(Subject,{foreignKey:'subjectId'});
Teacher.belongsTo(Class, { foreignKey: 'classId' });



module.exports = Teacher;
