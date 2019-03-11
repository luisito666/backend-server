var express = require('express');
var bcrypt = require('bcryptjs');

var mdAuthenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

// Rutas


// =================================
// Obtener todos los usuarios 
// =================================
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


// =================================
// Crear actualizar usuario
// =================================
app.put('/:id', mdAuthenticacion.verificaToken ,(request, response) => {

    var id = request.params.id
    var body = request.body;

    Usuario.findById(id, (error, usuario) => {

        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: error
            });
        }

        if ( !usuario ) {
            return response.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id: ' + id + ' no existe',
                errors: { message: 'no exite con usuario con es ID'}
            });
        }

        usuario.nombre = body.nombre;
        usuario.apellido = body.apellido;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save( (error, usuarioGuardado) => {
            if (error) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: error
                });
            }

            usuarioGuardado.password = ';)'

            response.status(200).json({
                ok: true,
                usuarios: usuarioGuardado
            });
             
        });

    });
  
});

// =================================
// Crear un nuevo usuario
// =================================
app.post('/', mdAuthenticacion.verificaToken , (request, response) => {
    var body = request.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    })

    usuario.save( (error, usuarioGuardado) => {

        if (error) {
            return response.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: error
            });
        }

        response.status(201).json({
            ok: true,
            usuarios: usuarioGuardado
        });
    });

});

// =================================
// Borrar un usuario por el id
// =================================
app.delete('/:id', mdAuthenticacion.verificaToken , (request, response) => {

    var id = request.params.id;

    Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
        if (error) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: error
            });
        }

        if ( !usuarioBorrado ) {
            return response.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id: ' + id + ' no existe',
                errors: { message: 'no exite con usuario con es ID'}
            });
        }

        response.status(200).json({
            ok: true,
            usuarios: usuarioBorrado
        });
    });
});

module.exports = app;