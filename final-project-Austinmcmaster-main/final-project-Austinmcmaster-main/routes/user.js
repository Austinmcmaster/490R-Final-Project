const express = require('express');
const { User } = require('../models');
const router = express.Router();
const models = require("../models")
const Users = models.User


router.get('/', async (req,res) => {
    if(req.user.isAdmin()){
        try {
            const posts = await Users.find();
            res.json(posts)
            res.status(200)
        }
        catch(err){
            res.json({success: false, error: err})
            res.status(500)
        }
    }
    else {
        res.status(401)
        res.json({sucess: false, message: "You are not an admin"});
    }

})

router.get('/:UserID', async (req,res) => {
    if(req.user.isAdmin() || req.user.id == req.params.UserID){
        try{
            const singleUser = await Users.findById(req.params.UserID);
            res.json(singleUser)
            res.status(200)
        }
        catch(err){
            res.status(404);
            res.json({sucess:false,error: "Invalid User ID"})
        }
    }

    else {
        res.status(401)
        res.json({sucess: false, message: "You do not have access to this data."});
    }    
})


router.delete('/:UserID', async (req,res) =>{
    if(req.user.isAdmin() || req.user.id == req.params.UserID){

        try{
        const deleteUser = await Users.deleteOne({_id: req.params.UserID})
        res.json(deleteUser);
        }
        catch(err){
            res.json({message:err})
            res.status(500)
        }
    }
    else {
        res.status(401)
        res.json({sucess: false, message: "You do not have authorization for this action."});
    }    

})


router.patch('/:UserID', async (req,res) => {
    if(req.user.isAdmin()){
        try {
        const user = await User.findOne({_id: req.params.UserID });
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        if(req.body.role) {
            user.role = req.body.role;
        }
        await user.save();
        res.json({user,message:"Update Complete"})
        }   
        catch(err){
            res.json({message:err})
            res.status(500)
        }
    }
    else if (req.user.id == req.params.UserID){
        try {
            const user = await User.findOne({_id: req.params.UserID });
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.password) {
                user.password = req.body.password;
            }
            await user.save();
            res.json({user,message:"Update Complete"})
            }   
            catch(err){
                res.json({message:err})
                res.status(500)
            }
    }
    else {
        res.status(401)
        res.json({sucess: false, message: "You do not have authorization for this action."});
    }
})




module.exports = router;