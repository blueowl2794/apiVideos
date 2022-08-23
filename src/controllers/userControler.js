const { User, Role, sequelize } = require('../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../config/auth');
const queryInterface = sequelize.getQueryInterface();

const conexion = (userId,roleId)=>{ return Promise.all([
    queryInterface.bulkInsert('user_role', [
        { user_id: userId, role_id: roleId, createdAt: new Date(), updatedAt: new Date() },
      ], {})

])} ;
const deleteConexion = (userId)=>{ return Promise.all([
    queryInterface.bulkDelete('user_role', { user_id: userId}, {})

])} ;

module.exports ={
    async find(req, res, next) {
        let user = await User.findByPk(req.params.id,{include:"role"});
        
        console.log(user);

        if (!user) {
            res.status(404).json({ msg: "El contenido no se ha encontrado" });
        } else {
            req.users = user;
            next();
        }
    },
    
    async getRole(req, res, next) {
        let role = await Role.findAll();
        
        console.log(role);

        if (!role) {
            res.status(404).json({ msg: "El contenido no se ha encontrado" });
        } else {
            res.json(role);
        }
    },

    async index(req, res) {
        let user = await User.findAll();
        res.json(user);
    },

    // Show
    async show(req, res) { 
        res.json(req.users);
    },

    //Create
    async create(req, res) {
        
        const { name, email, password, roleId } = req.body 
        try {

            const id = await Role.findByPk(roleId);

            const result = await User.create({
                name,
                email,
                password:bcrypt.hashSync(password, +authConfig.rounds),
                
            }, 
            {
                include:"role", 
            }
            )
            console.log("id",id.id);
            conexion(result.id,id.id)

            res.json(result)
            
        } catch (error) {
            error?res.send({ msg:error.errors[0]}):res.send({ msg:error})
            
        }
        

        

        // req.content.title = req.body.title;
        // req.content.description = req.body.description;
        // req.content.file = req.body.file;

    },

    // Update
    async update(req, res) {

        try {
            const id = await Role.findByPk(req.body.roleId);
            req.users.name = req.body.name;
            req.users.email = req.body.email;
            req.users.password = bcrypt.hashSync(req.body.password, +authConfig.rounds) ;

            deleteConexion(req.users.id)

            conexion(req.users.id,id.id)

            req.users.save().then(users => {
                res.json(users);
            })
        } catch (error) {
            error?res.send({ msg:"error"}):
            res.send({ msg:error.errors[0]})
            
        }

        
        // res.send(req.content.category.map((i)=>i.name))
    },

    // Delete
    async delete(req, res) {
        req.users.destroy().then(content => {
            res.json({ msg: "el contenido ha sido eliminado " });
        })
    },


}