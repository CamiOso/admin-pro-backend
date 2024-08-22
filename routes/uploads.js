/*

ruta: /api/uploads/
*/
const {Router}=require('express');
const expressFileUplod=require('express-fileupload');
const {validarJWT}=require('../middlewares/validar-jwt');
const { fileUplod,retornaImagen } = require('../controllers/uploads');
 



 const router=Router();

 router.use(expressFileUplod());
 router.put('/:tipo/:id',fileUplod);
 router.get('/:tipo/:foto',retornaImagen);
 







module.exports=router;
