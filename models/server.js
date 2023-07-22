const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config.js');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Conectar a base de datos MONGODB
        this.conecectarDB();
        //Middlewars
        this.middlewars();
        //Routing
        this.routes();
    }

    async conecectarDB(){
        await dbConection();
    }

    middlewars(){
        //cors
        this.app.use(cors());
        //Leer y parsear un JSON en body
        this.app.use(express.json());
        //Public directory
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuario.routes.js'));
        
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER RUNNING ON PORT ${this.port}`);
        });
    }
}

module.exports = Server;