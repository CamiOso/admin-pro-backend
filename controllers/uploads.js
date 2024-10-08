const path=require('path');
const fs=require('fs');

const { response } = require("express");

const {v7:uuidv7}=require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");


const fileUplod=(req,res=response)=>{


 const tipo=req.params.tipo;
 const id=req.params.id;


 const tiposValidos=['hospitales','medicos','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un médico,usuario u hospital (tipo)'
        })}


        //Validar que exista un archivo
     if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        })}


        //Procesar la imagen

        const file=req.files.imagen;

        const nombreCortado=file.name.split('.');
        const extensionArchivo=nombreCortado[nombreCortado.length-1];

        //Validar extensión

        const extensionesValidas=['png','jpg','jpeg','gif'];

        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json({
                ok:false,
                msg:'No es una extensión permitida'
            })

        }

        //Generar el nombre del archivo
        const nombreArchivo=`${uuidv7()}.${extensionArchivo}`;



    //Path para guardar la imagen

    const path=`./uploads/${tipo}/${nombreArchivo}`;

    //Mover Imagen

    file.mv(path, (err) =>{
        if (err){
            console.log(err);
          return res.status(500).json({
            ok:false,
            msg:'Error al mover la imagen'
          });
        }

        //Actualizar base de datos

        actualizarImagen(tipo,id,nombreArchivo);



        res.json({
            ok:true,
            msg:'Archivo Cargado',
            nombreArchivo
        });
      });
        








 
}




const retornaImagen=(req,res=response)=>{
    const tipo=req.params.tipo;
    const foto=req.params.foto;

    
   const pathImg=path.join(__dirname,`../uploads/${tipo}/${foto}`);
   //Imagen por defecto

   if(fs.existsSync(pathImg)){
  res.sendFile(pathImg);
   }else{
     const pathImg=path.join(__dirname,`../uploads/no-image.jpg`);
     res.sendFile(pathImg);


   }




  

}


module.exports={
    fileUplod,
    retornaImagen
}