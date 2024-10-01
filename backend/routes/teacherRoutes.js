


// const express = require('express');
// const router = express.Router();

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// const Teacher = require('../models/teacher.js');



// router.post('/register', async (req, res) => {
//     const { name, email, password, subject } = req.body;
//     console.log(req.body);
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const teacher = await Teacher.create({
//             name,
//             email,
//             password: hashedPassword,
//             subject,
//         });
//         res.status(201).json({ message: "Teacher registered successfully", teacher });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Database error or email already exists" });
//     }
// });

// module.exports=router;



 const express = require('express');
 const router = express.Router();

 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcryptjs');

 const Teacher = require('../models/teacher.js');
 const Class = require('../models/class.js');
 const Subject=require('../models/subject.js');
 router.get('/',async(req,res)=>{
    const teachers = await Teacher.findAll({
      include: [
         { model: Class, attributes: ['id', 'className'] }, // Specify class fields
         { model: Subject, attributes: ['id', 'SubjectName'] } // Specify subject fields
      ]
  });
    res.json(teachers);
 })

 router.post('/',async(req,res)=>{
    const { name, subjectId, classId } = req.body;
    const newTeacher = await Teacher.create({ name, subjectId, classId });
    res.status(201).json(newTeacher);
 })

 router.delete('/:id',async(req,res)=>{
   const {id}=req.params;
   try{
      const deleteTeacher=await Teacher.destroy({where:{id}});
      if(deleteTeacher){

         res.status(200).send();
      }
      else{
         res.status(404).json({error:"teacher not found"});
      }
   }catch(error){
      res.status(400).json({error:"failed to delete subject" });
   }
 })


 module.exports=router;