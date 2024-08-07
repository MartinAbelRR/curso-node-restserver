const {Router} = require('express');
const {validarCampos} = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('correo','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports= router;
