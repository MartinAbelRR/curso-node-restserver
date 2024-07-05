const {Router} = require('express');
const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuarioPath} = require('../controllers/usuarios');
const { check } = require('express-validator');
const { esRoleValido, existeUsuarioPorId } = require('../controllers/db-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { validarCampos, validarJWT, tieneRole } = require('../middlewares');
const router = Router();

router.get('/', usuariosGet)

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id',[
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete)

router.patch('/', usuarioPath)

module.exports = router;