const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./routes/users');
const app=express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());



app.use('/api/users',router);
app.use('/api/product',require('./routes/product'));

app.use('/uploads', express.static('../uploads'));


mongoose.connect('mongodb://localhost:27017/cricket',{useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
    if(err)console.log(JSON.stringify(err));
    else console.log('DB connected successfully');
});

app.get('/',(req,res)=>{
    res.send('Hello mern stack');
});

const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Listening on the port ${PORT}`);
});