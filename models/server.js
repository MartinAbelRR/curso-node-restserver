const { dbConnection } = require('../database/config');
const cors = require('cors');
const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.usuariosPath = '/api/user';

        // Llamada a conectarDB
        this.conectarDB();

        // Middleware.
        this.middlewares();
        // Rutas de la aplicación.
        this.routes();
    }  

    // Aquí se define el método middleware que publicara la carpeta public.
    middlewares() {
        // CORS.
        this.app.use(cors());
        // Lectura y parseo del body recibe lo que se envia.
        this.app.use(express.json());
        // Directorio público.
        this.app.use(express.static('public'));
    }
    
    async conectarDB() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routers/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}

module.exports = Server;
