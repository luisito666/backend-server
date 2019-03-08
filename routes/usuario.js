var express = require('express');

var app = express();

var Usuario = require('../models/usuario');

// Rutas
app.get('/', (request, response, next) => {

    Usuario.find({ }, 'nombre email img role')
        .exec(
            (error, usuarios) => {

            if (error) {
                return response.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuario',
                    errors: error
                });
            }

            response.status(200).json({
                ok: true,
                usuarios: usuarios
            });

    })

    
});

module.exports = app;