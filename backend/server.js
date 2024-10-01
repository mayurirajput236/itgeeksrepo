const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
 const authRoutes = require('./routes/auth');
 const teacherRoutes=require('./routes/teacherRoutes')
 const studentRoutes=require('./routes/studentRoutes')
 const classRoutes=require('./routes/classRoutes.js')
 const subjectRoutes=require('./routes/subjectRoutes.js')
 const Class=require('./models/class.js');
 const Student = require('./models/student.js');
// const db = require('.database/db.js');
const sequelize = require('./config/database');
const Teacher = require('./models/teacher.js');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

 app.use('/api/auth', authRoutes);
 app.use('/api/teachers',teacherRoutes);
 app.use('/api/student',studentRoutes);
 app.use('/api', classRoutes); 
 app.use('/api',subjectRoutes)
 app.get('/api/classesCount', async (req, res) => {
    try {
        const {count} = await Class.findAndCountAll();
        
        res.json({count});
        console.log({count});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch count' });
    }
});
app.get('/api/studentsCount',async(req,res)=>{
    try {
        const {count} = await Student.findAndCountAll();
        
        res.json({count});
        console.log({count});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch count' });
    }
})
app.get('/api/teachersCount',async(req,res)=>{
    try {
        const {count} = await Teacher.findAndCountAll();
        
        res.json({count});
        console.log({count});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch count' });
    }
})

const PORT = process.env.PORT || 5000;
sequelize.sync({ force: true });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
