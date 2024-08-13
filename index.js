require('dotenv').config();
const express = require('express');
const cors=require('cors');
const {dbConection}=require('./database/config');

const app=express();



//CORS
app.use(cors());


//Lectura y parseo del body

app.use(express.json());

//Base de datos
dbConection();
console.log(process.env);




//Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/hospitales',require('./routes/hospitales'));
app.use('/api/medicos',require('./routes/medicos'));
app.use('/api/todo',require('./routes/busquedas'));
app.use('/api/login',require('./routes/auth'));





app.listen(process.env.PORT,()=>{
    console.log('Server is running on port'+ process.env.PORT);
})