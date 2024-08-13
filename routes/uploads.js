/*

ruta: /api/uploads/
*/
const {Router}=require('express');
const expressFileUplod=require('express-fileupload');
const {validarJWT}=require('../middlewares/validar-jwt');
const { fileUplod } = require('../controllers/uploads');
 



 const router=Router();

 router.use(expressFileUplod());
 router.put('/:tipo/:id',validarJWT,fileUplod);
 







module.exports=router;
