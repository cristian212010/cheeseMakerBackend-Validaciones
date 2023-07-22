const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs');

const getUsers = (req, res)=>{
    res.json({
        "message": "home-page"
    });
};

const postUsers = async (req, res)=>{
    const {nombre, email, password, rol} = req.body;
    const usuario = new Usuario({nombre, email, password, rol});
    //Verificar si el correo ya existe(duplicado)
    const existeEmail = await Usuario.findOne({email});
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Email is already registered'
        });
    }
    //Ecriptar nuestra contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    await usuario.save();
    res.json({
        "message": "post-page",
        usuario
    });
};

const deleteUsers = (req, res)=>{
    res.json({
        "message": "delete-page"
    });
};

const putUsers = (req, res)=>{
    res.json({
        "message": "put-page"
    });
};

const patchUsers = (req, res)=>{
    res.json({
        "message": "patch-page"
    });
};

module.exports = {
    getUsers,
    postUsers,
    deleteUsers,
    putUsers,
    patchUsers
};