const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        //Directorio Publico
        this.app.use( express.static('public') );

    }

    routes() {
        /* Se simula la respuesta de una placa configurada */
        this.app.get('/api/config', (req, res) => {
            res.json({
                columna: 7,
                fila: 6,
                board: [
                    [1,0,0,0,0,0,0],
                    [0,0,0,0,1,1,0],
                    [0,0,0,0,0,1,0],
                    [1,0,0,0,0,0,0],
                    [1,0,0,0,0,0,0],
                    [1,0,0,0,0,0,0]
                ]
            });
        });

        this.app.post('/api/config', (req, res) => {

            const { board } = req.body;

            /* Se debe hacer el calculo de data en base a board! */

            /* Para este ejemplo se hardcodean el cluster generado */

            const data = [
                ["[ [0, 1], [0, 2] ]"],
                ["[ [4, 3] ]"],
                ["[ [7, 3] ]"],
                ["[ [2, 3] ]"],
                ["[ [8, 5] ]"],
                ["[ [8, 7], [8, 8] ]"]
            ];

            res.json({
                msg: 'Placa creada!',
                cluster: data
            });
        });

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;