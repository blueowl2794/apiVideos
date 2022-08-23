const { User } = require('../models/index');

module.exports = {

    show(req, res, next) {
        if(User.isAdmin(req.user.role)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    },
    showC(req, res, next) {
        if(req.user.id  || User.isAdmin(req.user.role)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    },

    
    create(req, res, next) {
        console.log("create", req.user)
        if(User.isAdmin(req.user.role)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    },

    update(req, res, next) {
        console.log("update", req.user)
        if(req.users.id === req.user.id  || User.isAdmin(req.user.role)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    },
    updateC(req, res, next) {
        console.log("update", req.user)
        if( User.isAdmin(req.user.role)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    },

    delete(req, res, next) {
        
        if(req.users.id === req.user.id  || User.isAdmin(req.user.role)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    },
    deleteC(req, res, next) {
        
        if( User.isAdmin(req.user.role)) {
            next();
        } else {
            res.status(401).json({ msg: "No estas autorizado para ver esta pulicacion" });
        }
    }

}