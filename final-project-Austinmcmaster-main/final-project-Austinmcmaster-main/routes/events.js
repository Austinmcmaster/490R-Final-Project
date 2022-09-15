const express = require('express');
const router = express.Router();
const models = require("../models")
const Events = models.Events


router.use((req,res,next) => {
    console.log("A request came in....");
    next();
})

router.get("/testAPI", function(req,res){
    const resObejct = {
        message: "Test API is working",
        user: req.user
    }
    return res.send(resObejct);
})


// Read Many
router.get('/', async (req,res) => {
    if(req.user.isAdmin()){
        try {
            const posts = await Events.find();
            res.json(posts)
            res.status(200)
        }
        catch(err){
            res.json({success: false, error: err})
            res.status(500)
        }
    }
    else {
        res.json({sucess:false, message:"You can not access all events unless you are an admin."})
        res.status(401)
    }

})
// READ ONE 
router.get('/:eventsID', async (req,res) => {
        try{
            const singlePost = await Events.findById(req.params.eventsID);
            if(req.user.isAdmin() || req.user.id == singlePost.author){
                res.json(singlePost)
                res.status(200)
            }
            else {
                res.status(401)
                res.json({sucess: false, message: "You do not have access to this event."});
            }  
        }
        catch(err){
            res.status(404);
            res.json({sucess:false,error: "Invalid ID for an event."})
        }
})

// Create
router.post('/', async (req,res) =>{
    if(!req.body.title){
        res.status(400)
        return res.json({sucess:false, message: "Please include a title to create a post."});
    }

    const events = new Events({

        title: req.body.title,
        description: req.body.description,
        day_start: req.body.day_start,
        day_end:req.body.day_end,
        type:req.body.type,
        color:req.body.color,
        created_at:req.body.created_at,
        updated_at:req.body.updated_at,
        author:req.user._id

    });
    try {
        const savedPost = await events.save();
        res.json(savedPost);
    }
    catch (err) {
        res.status(500)
        res.json({sucess:false, error:err})
    }
})

// Delete
router.delete('/:eventsID', async (req,res) =>{
        try{
            const eventQueried = await Events.findById(req.params.eventsID);
            if(req.user.isAdmin() || req.user.id == eventQueried.author){
            const deleteEvent = await Events.deleteOne({_id: req.params.eventsID})
            res.json(deleteEvent);
            }
            else {
                res.status(401)
                res.json({sucess: false, message: "You do not have access to delete this event."});
            }  
        }
        catch(err){
            res.json({message:"Unable to Delete Event/Find Event to Delete"})
            res.status(500)
        }
})

//Update one item title currently
router.patch('/:eventsID', async (req,res) => {
        try {
            const eventQueried = await Events.findById(req.params.eventsID);
            if(req.user.isAdmin() || req.user.id == eventQueried.author){
            const updatedPost = await Events.updateOne({_id: req.params.eventsID}, 
                {$set: {title: req.body.title,
                description: req.body.description,
                day_start: req.body.day_start,
                day_end:req.body.day_end,
                type:req.body.type,
                color:req.body.color,
                created_at:req.body.created_at,
                update_at:Date.now(),
                user_id:req.user_id}});
                res.json(updatedPost);
            }
            else {
                res.status(401)
                res.json({sucess: false, message: "You do not have access to update this event."});
            }  
        }
        catch(err) {
            res.json({success: false, error: "Unable to patch at that Event ID"})
            res.status(500)
        }
})

module.exports = router
