const {response}=require('express');
const bcrypt= require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT}=require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const login=async(req,res=response)=>{

    const {email,password}=req.body;



    try{

   //Verificar email

       const usuarioDB=await Usuario.findOne({email});
       if(!usuarioDB){
        return res.status().json({
            ok:false,
            msg:'Email no encontrado'
        });

       }


       //Validar contraseña
       const validPassword=bcrypt.compareSync(password,usuarioDB.password);
       if(!validPassword){
        return res.status(400).json({
            ok:false,
            msg:'Contraseña no válida'
        })

       }

   //Generar el Token -JWT

   const token=await generarJWT(usuarioDB.id);


        res.json({
            ok:true,
            token})

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Por favor hable con el administrador'
        });

    }

}



const googleSignIn=async(req,res=response)=>{




  try {
    const {email,name,picture}=await googleVerify(req.body.token);

    res.json({
        ok:true,
        msg:'Google Sign In',
        email,name,picture
    });

  }catch(error){
    res.status(400).json({
        ok:true,
        msg:'Token de Google no es válido'
    });

  }


 

}



module.exports={
    login,
    googleSignIn
}