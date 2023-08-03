const {response} = require('express');
const Usuario = require('../models/Usuario.js');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate.JWT.js');

const login = async (req, res=response)=>{

    const {email, password} = req.body;
    try {

        //Verificar que el correo electronico exista
        const usuario = await Usuario.findOne({email});

        if (!usuario){
            return res.status(400).json({
                msg:"Usuario no es correcto"
            })
        }

        // El usuario tenga un estado de activo
        if (!usuario.estado){
            return res.status(400).json({
                msg:"Estado Inactivo"
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg:"Password Incorrecto"
            })
        }

        // generacion para Validacion JSON WEB TOKEN 

        const token = await generateJWT(usuario.id)

        res.json({
           usuario,
           token
        })
        
    } catch (error) {
        console.log(error);
        return res.json({
            msg:"contacte al servicio tecnico"
        })
    }
}

module.exports = {
    login
}