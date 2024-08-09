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
app.use('/api/usuarios',require('./routes/usuarios'));



app.listen(process.env.PORT,()=>{
    console.log('Server is running on port'+ process.env.PORT);
})