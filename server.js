require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/connect');
const PORT = process.env.PORT || 4200 ;

connectDB();
app.use(express.json())
app.use(cors(require('./config/allowedCors')));

app.use('/auth', require('./routes/authRoute'));



app.use('/todo', require('./routes/todoRoute'));




mongoose.connection.once('open', ()=>{
    console.log('connected to db');
    app.listen(PORT, ()=>{
        console.log(`Server listening on port ${PORT}`)
    })
})


mongoose.connection.on('err',()=>{
    console.log(err)
})





