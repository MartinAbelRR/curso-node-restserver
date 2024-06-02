const {request, response} = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;
    res.json({
        msg: 'get API - controlador',
        query
    });
}

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req = request, res = response) => {
    const {id} = req.params; // Params puede traer muchos datos.
    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
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