// Requires -->
var express = require('express');
var mongoose = require('mongoose');


// Inicializar Variables
var app = express();

//Conexion
mongoose.connection.openUri('mongodb://mongodb:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', ' online')
});

// Rutas
app.get('/', (request, response, next) => {
    response.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});

app.get('/suave', (req, res) => {
    res.status(200).json({
        quehubo: 'gonorrea',
        suave: 'la arepa',
        pamela: 'chu'
    });
})

// Escuchar Peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', ' online');
})