const express=require('express');
const router=express.Router();

const Subject=require('../models/subject.js')

router.post('/subjects',async(req,res)=>{
    const{ SubjectName }=req.body;
    console.log("request body",req.body);
    try{
        const subjects= await Subject.create({ SubjectName });
        res.status(201).json({ classStatus:true, message: "class created successfully", subjects});

    }
    catch(err){
       
        res.status(500).json({ error: "Database error or email already exists" });
    }
})
router.get('/subjectList',async(req,res)=>{

    console.log("hello get")
    try {
        const subjects = await Subject.findAll();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


router.delete('/subjects/:id',async(req,res)=>{
    const{id}=req.params;
    try{
        const deleteSubject=await Subject.destroy({where:{id}});
        if(deleteSubject){
            res.status(200).send();
        }else {
            return res.status(404).json({ error: 'Class not found' });
        }
    }catch(error){
        res.status(400).json({error:"failed to delete subject" });
    }
})
module.exports=router;