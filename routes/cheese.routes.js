const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { getCheeses, postCheese, deleteCheese, putCheese } = require('../controllers/cheese.controllers.js')
const { isAdminRole } = require('../middlewares/validate.role.js');
const { cheeseExistsById, categoriaExistsById } = require('../helpers/db.validators.js');

const router = Router();

router.get('/', getCheeses);
router.post('/', [ 
    validateJWT, 
     check('name','El nombre es obligatorio').not().isEmpty(),
     check('categoria').custom(categoriaExistsById),
     validateDocuments
 ], postCheese );
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(cheeseExistsById),
    validateDocuments
], deleteCheese);
router.put("/:id", [
    check('id', 'No es un ObjectID valido para MongoDB ').isMongoId(),
    check('id').custom(cheeseExistsById),
    validateDocuments
], putCheese);
module.exports = router;

