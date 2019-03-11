var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;



// =================================
// Verificar Token
// =================================

exports.verificaToken = function(request, response, next) {

    var token = request.query.token;

    jwt.verify(token, SEED, (error, decode) => {

        if (error) {
            return response.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: error
            });
        }

        request.usuario = decode.usuario;

        next();

    });

}

