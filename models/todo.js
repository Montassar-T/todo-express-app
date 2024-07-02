const mongoose = require('mongoose');




const todoSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required: true
    },
    isFinished :{
        type: String,
        default : false
    }

},{timestamps:true , collection:'todos'});



module.exports = mongoose.model('Todo', todoSchema);