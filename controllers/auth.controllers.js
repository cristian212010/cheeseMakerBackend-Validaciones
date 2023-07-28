const { response } = require('express');
const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate.JWT.js');

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

        //Generacion para Validacion JSON WEB TOKEN
        const token = await generateJWT(usuario.id);
        return res.json({
            usuario,
            token
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