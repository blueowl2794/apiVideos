const jwt = require('jsonwebtoken');
const authenticateConfig = require('../../config/auth');
const { User } = require('../models/index'); 

module.exports = (req, res, next) => {

    // Comprobar que existe el token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {

        
        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, authenticateConfig.secret, (err, decoded) => {//decode nos devuelve el user

            if(err) {
                res.status(500).json({ msg: "Error al autenticar token", err });
            } else {
                
                User.findByPk(decoded.user.id, { include: "role" }).then(user => { 

                    console.log("roles",user.role);
                    // req.user = decoded;

                    req.user = user;
                    next();
                });
            }

        })
    }

};