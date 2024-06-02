const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/user';

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