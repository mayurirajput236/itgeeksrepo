const express=require('express');
const router=express.Router();

const Class=require('../models/class.js')

router.post('/classes',async(req,res)=>{
    const{className}=req.body;
    console.log(req.body);
    try{
        const classes= await Class.create({className});
        res.status(201).json({ classStatus:true, message: "class created successfully", classes});

    }
    catch(err){
        console.error(error);
        res.status(500).json({ error: "Database error or email already exists" });
    }
})
router.get('/classesList',async(req,res)=>{

    console.log("hello get")
    try {
        const classes = await Class.findAll();
        res.status(200).json(classes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.delete('/classes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedClass = await Class.destroy({ where: { id } });
        if (deletedClass) {
            return res.status(204).send(); 
        } else {
            return res.status(404).json({ error: 'Class not found' });
        }
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ error: 'Failed to delete class' });
    }
});

module.exports=router;