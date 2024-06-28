const {request, response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = async (req = request, res = response) => {
    // const query = req.query;
    const {q, nombre = 'no envia', apikey} = req.query;
    const {desde = 0, limite = 5} = req.query; // Si no se envia el limite, por defecto sera 5.

    const query = {estado: true}; // Solo los que tengan estado en true.
    // const total = await Usuario.countDocuments(query); // Cuenta todos los registros de la colección.
    // const usuarios = await Usuario.find(query)
    // .skip(Number(desde)) // Salta los registros de la colección.
    // .limit(Number(limite)); // Encuenta todos los registros de la colección. 

    // Encadena las promesas para que se ejecuten al mismo tiempo.
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query), // Cuenta todos los registros de la colección.
        Usuario.find(query) // Encuenta todos los registros de la colección. 
        .skip(Number(desde)) // Salta los registros de la colección.
        .limit(Number(limite)) // Encuenta todos los registros de la colección. 
    ]);
    
    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    // const errores = validationResult(req);
    // if (!errores.isEmpty()) {
    //     return res.status(400).json(errores);
    // }

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo existe.
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado.'
        });
    }

    // Encriptar la contraseña.
    const salt = bcryptjs.genSaltSync(); // Cantidad de vueltas que hara la encriptación por def.10.
    usuario.password = bcryptjs.hashSync(password, salt); // Encripta la contraseña.
    
    await usuario.save(); // Esto es para guardar en la base de datos.

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuariosPut = async (req = request, res = response) => {
    const {id} = req.params; // Params puede traer muchos datos.

    // Excluyo password, google y correo (no se actualizan) y todo lo demas lo almaceno es resto.
    const {_id, password, google, correo, ...resto} = req.body;

    // POR HACER validar id contra la DB.
    if (password) {
        // Encriptar la contraseña.
        const salt = bcryptjs.genSaltSync(); // Cantidad de vueltas que hara la encriptación por def.10.
        resto.password = bcryptjs.hashSync(password, salt); // Encripta la contraseña.
    }

    // Actualiza el registro: Lo busco por id y actualiza con los valores de resto.
    const usuario = await Usuario.findByIdAndUpdate(id, resto); // Esto es para guardar en la base de datos.


    res.json({
        msg: 'put API - controlador',
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;

    // Borrador físico.
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Borrador lógico.
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false}); // Esto es para guardar en la base de datos.
    res.json({
        usuario
    });
}

const usuarioPath = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuarioPath
}