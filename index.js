require('dotenv').config();
const express = require('express');
const cors=require('cors');
const {dbConection}=require('./database/config');

const app=express();



//CORS
app.use(cors());

//Base de datos
dbConection();
console.log(process.env);




//Rutas
app.get('/',(req,res)=>{
    res.status(400).json({
        ok:true,
        msg:'Hola mundo'
    }

    );


});


app.listen(process.env.PORT,()=>{
    console.log('Server is running on port'+ process.env.PORT);
})