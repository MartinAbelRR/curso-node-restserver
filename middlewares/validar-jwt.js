const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No existe Token en la peticion'
        });
    }   

    try {
        // Función que verifica la valides del token.
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // leer el usuario que corresponde al uid.
        req.uid = uid;
        const usuario = await Usuario.findById(uid);
        // Verificar si el usuario existe.
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en la base de datos'
            });
        }
        console.log({usuario});
        // Verificar si el usuario tiene estado en true.
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado en false'
            });
        }        

        req.usuario = usuario;
        
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }    
}

module.exports = {
    validarJWT
}