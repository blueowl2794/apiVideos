const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = { 

    // Login
    signIn(req, res) {

        let { email, password } = req.body;
        (typeof password === 'number')?password = password.toString():null
        

        User.findOne({
            where: {
                email: email
            },include:'role'
        }).then(user => {

            if (!user) {
                res.status(404).json({ msg: "Usuario con este correo no encontrado" });
            } else {

                if (bcrypt.compareSync(password, user.password)) {

                    let token = jwt.sign({ user: user }, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });

                    res.json({
                        user: user,
                        token: token
                    })

                } else {

                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }

            }

        }).catch(err => {
            res.status(500).json(err);
        })

    },


    signUp(req, res) {

        let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: password
        }).then(user => {

            let token = jwt.sign({ user: user }, authConfig.secret, {
                expiresIn: authConfig.expires
            });

            res.json({
                user: user,
                token: token
            });

        }).catch(err => {
            res.status(500).json(err);
        });

    }

}