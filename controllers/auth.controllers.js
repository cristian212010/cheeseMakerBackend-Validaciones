const { response } = require('express');
const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs');

const login = async (req, res=response)=>{
    const {email, password} = req.body;
    try {
        //Verificar que el correo electronico exista
        const usuario = await Usuario.findOne({email});
        if (!usuario) {
            return res.status(400).json({
                msg:"El email no es correcto"
            })
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg:"Estado inactivo"
            })
        }
        
        //Verificar la contraseña
        const validatepwd = bcryptjs.compareSync(password, usuario.password);
        if(!validatepwd){
            return res.status(400).json({
                msg: "Contraseña Incorrecta"
            })
        }

        //El usuario tenga un estado de activo
        return res.json({
            msg:"ok"
        })
    } catch (error) {
        res.json({
            msg:"Contacte al servicio tecnico"
        })
    }
}

module.exports = {
    login
};