const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
    username :{
        type : String,
        required: true

    },
    email:{
        type : String,
        required: true,
        unique:true

    },
    password:{
        type : String,
        minLength: 6

    }

},{timestamps: true , collection : 'users'})

module.exports = mongoose.model('User', userSchema);