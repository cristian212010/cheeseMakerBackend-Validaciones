const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { getCategorias, postCategoria, deleteCategoria, putCategoria, getOne } = require('../controllers/categoria.controllers.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
const { categoriaExistsById } = require('../helpers/db.validators.js');


const router = Router();

/**
 * localhost/api/categorias
 */
router.get('/:id', [
    check('id', 'No es un ObjectID valido para MongoDB ').isMongoId(),
    check('id').custom(categoriaExistsById),
    validateDocuments
], getOne);

// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );

router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(categoriaExistsById),
    validateDocuments
], deleteCategoria);

router.put("/:id", [
    check('id', 'No es un ObjectID valido para MongoDB ').isMongoId(),
    check('id').custom(categoriaExistsById),
    validateDocuments
], putCategoria);

router.get("/", getCategorias)

module.exports = router;