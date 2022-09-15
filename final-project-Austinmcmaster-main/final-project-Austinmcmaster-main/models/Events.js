const mongoose = require('mongoose');
const { User } = require('.');

const EventSchema = mongoose.Schema({ 
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:false
    },
    day_start: {
        type:Date,
        default:Date.now
    },
    day_end: {
        type:Date,
        default: +new Date() + 1*24*60*60*1000
    },
    type: {
        type:String,
        required:false
    },
    color: {
        type:String,
        required:false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    // Need to make
    update_at: {
        type:Date,
        default: Date.now
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        default: "User"
    },
})


module.exports = mongoose.model('Events', EventSchema);