const {Router} = require('express');
const {check} = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
// 5. se importA validador de rol desde helpers
//10.  se importa validador de emailExiste
const { isValidRole, emailExiste, userExistsById } = require('../helpers/db.validators.js');


const { getUsers, 
        postUsers, 
        deleteUsers, 
        putUsers, 
        patchUsers} = require('../controllers/usuario.controllers.js');


        
const router = Router();

router.get("/", getUsers);
router.post("/",[
        check('nombre', 'Nombre no es valido').not().isEmpty(),
        check('password', 'Password debe ser de minimo 6 letras').isLength({min :6}),
        check('email', 'El email no es valido').isEmail(),
        //9. middleware y express validator si emailExiste
        check('email').custom(emailExiste ),
        /* check('rol', 'No es un rol valido').isIn(['ADMIN', 'USER']), */
        
        //4.  Invocamos funcion validar de rol (cuerpo trasladado a helpers)
        check('rol').custom(isValidRole),
        validateDocuments
] ,postUsers);
//18. Agrego :id a endpoint delete
router.delete("/:id", [
//23. Se Crea nuevo Middleware "validate.JWT" en carpeta, para evitar que 
//se ejecute esta ruta borrar, sino existe un json web token valido
        validateJWT,
//24. se crea Middleware validador de roles en carpeta, para evitar que
//un usuario que intenta borrar, solo pueda si tiene rol de admin
           isAdminRole,   
//22. creamos middleware para chequear (copio desde put) para validar 
//que sea un id Valido
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( userExistsById ),
    validateDocuments
], deleteUsers );
//2. agregamos ID
router.put("/:id",
//3. agregamos express validator - Middlewares
[
        check('id', 'No es un ObjectID MongoDB válido').isMongoId(),
        //13. agregamos validacion perzonalizada de usuario por ID
        check('id').custom( userExistsById ),
        //16. copiamos validacion de rol desde metodo POST
        check('rol').custom(isValidRole),
       
        validateDocuments
    ], putUsers );
router.patch("/", patchUsers);

module.exports = router;