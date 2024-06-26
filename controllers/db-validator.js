const Role = require('../models/role');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
}

const emailExiste = async (correo = '') => {
    // Verificar si el correo existe.
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya está registrado.`);
    }
}

const existeUsuarioPorId = async (id) => {
    // Verificar si el usuario existe.
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El usuario con ${id} no existe en la base de datos.`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}