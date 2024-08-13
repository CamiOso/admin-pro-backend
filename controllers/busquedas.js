// getTodo

const {response} = require('express');

const Usuario=require('../models/usuario');
const Medico=require('../models/medico');
const Hospital=require('../models/hospital');

const getTodo=async(req,res=response)=>{
    const busqueda=req.params.busqueda;
    const regex=new RegExp(busqueda,'i');



    const[usuarios,medicos,hospitales]=await Promise.all([
        await Usuario.find({nombre:regex }),
        await Medico.find({nombre:regex}),
        await Hospital.find({nombre:regex})
    ]);




    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
      
})

}

module.exports={
    getTodo
}