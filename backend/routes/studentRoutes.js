const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Student = require('../models/student.js');
const Class = require('../models/class.js');


// router.post('/register', async (req, res) => {
//     const { name, email, password, className } = req.body;
//     console.log(req.body);
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const teacher = await Student.create({
//             name,
//             email,
//             password: hashedPassword,
//             className,
//         });
//         res.status(201).json({ message: "Teacher registered successfully", teacher });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Database error or email already exists" });
//     }
// });

//  console.error(error);
//         res.status(500).json({ error: "Database error or email already exists" });

router.post('/',async(req,res)=>{
    const{name,address,classId}=req.body;
    console.log(req.body);
    try{
        const students=await Student.create({
            name,
            address,
            classId
        });
        res.status(201).json({ message: "student created successfully",students});
    }
    catch(error){
        console.error(error);
         res.status(500).json({ error: "Database error " });
    }
})

router.get('/',async(req,res)=>{
   
     const students= await Student.findAll({include :Class});
     res.status(201).json({message:"get students",students});
})


router.delete('/:id',async(req,res)=>{
    const {id} =req.params;
    try{
    const deleteStudent=await Student.destroy({where:{id}});
    if(deleteStudent){
        res.status(200).send();
    }else{
        res.status(404).json({error:"student not found"});
    }
    }
    catch(error){
        res.status(404).json({error:"failed to delete student"});
    }
})


module.exports=router;