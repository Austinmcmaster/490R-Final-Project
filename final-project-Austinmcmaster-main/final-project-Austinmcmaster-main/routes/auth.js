const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/config')

const router = express.Router();


router.post('/signup' ,(req,res) => {
    if(! req.body.email || ! req.body.password){
        res.status(400);
        res.json({sucess: false, message: "Email and password are required"})
    }
    else {
        const newUser = new User({
            email: req.body.email,
            password: req.body.password
        })
        newUser.save((err) => {
            if(err){
                console.log(err)
                res.status(400)
                return res.json({sucess: false, message: "Email already exist"})
            }
            res.json({
                sucess:true,
                message: "Created User",
                user: newUser
            })
        })
    }
})

router.post('/login', (req,res) => {
    console.log("Login Called")
    console.log(req.body);
    User.findOne({email: req.body.email}, function(err,user){
        if(err) throw err;
        if(!user){
            console.log("Could not find a User with that User or Password")
            res.status(401).send({sucess: false, message: "User not found"})
        }
        else{
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch){
                    const tokenObj = {_id: user._id, email: user.email}
                    const token = jwt.sign(tokenObj, config.secret)
                    res.send({sucess:true, token: 'JWT ' + token})
                } 
                else {
                    res.status(401).send({sucess:false, message: 'Wrong Password'})
                }
            })
        }
    })
})


module.exports = router;