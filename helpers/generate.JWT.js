const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') =>{
    return new Promise((resolve, reject) =>{
        const paylod = {uid};
        jwt.sign(paylod, process.env.SECRET_OR_PRIVATE_KEY, {
            expiresIn : '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject ('No se pudo generar el JSON WEB TOKEN')
            }else{
                resolve (token)
            }
        });
    })
}

module.exports = {
    generateJWT
}