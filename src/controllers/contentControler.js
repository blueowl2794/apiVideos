const { Content, Category,  sequelize } = require('../models/index');
const multer  = require('multer');
const queryInterface = sequelize.getQueryInterface();

const conexion = (contentId,cateId)=>{ return Promise.all([
    queryInterface.bulkInsert('cont_cate', [
        { content_id: contentId, cate_id: cateId, createdAt: new Date(), updatedAt: new Date() },
      ], {})
])} ;
const deleteConexion = (contentId)=>{ return Promise.all([
    queryInterface.bulkDelete('cont_cate', { content_id: contentId}, {})

])} ;

let fileA
let newFile

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("file",file)
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        fileA = file
        console.log("file",file)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      let filename = file?.File?.name?file.File.name:file.originalname;
      newFile = uniqueSuffix + '-' + filename
      cb(null,uniqueSuffix + '-' + filename)
    }
}) 
  
const upload = multer({ storage: storage });
// const uploading = upload.single('myFile');


module.exports ={ 
    upload,
    
    async uploadFile (req, res){return res.send('envia file');},
    async find(req, res, next) {
        let content = await Content.findByPk(req.params.id,{include:"category"});
        console.log(content);

        if (!content) {
            res.status(404).json({ msg: "El contenido no se ha encontrado" });
        } else {
            req.content = content;
            next();
        }
    },

    async getCategory(req, res, next) {
        let cate = await Category.findAll();
        
        console.log(cate);

        if (!cate) {
            res.status(404).json({ msg: "El contenido no se ha encontrado" });
        } else {
            res.json(cate);
        }
    },

    async index(req, res) {
        let contents = await Content.findAll({include:"category"});
        res.json(contents);
    },

    // Show
    async show(req, res) {
        res.json(req.content);
    },

    // async upload (req, res) {
    //     upload.single("myFile");
    //     console.log(upload.single("myFile"))
    //     res.json(upload.single("myFile"));
    // },

    //Create
    async create(req, res) {

        const { title, description, myFile, categoryId } = req.body 
        try {
            console.log("soy fileA",fileA)
            console.log(myFile)

            const id = await Category.findByPk(categoryId);

            const result = await Content.create({
                title,
                description, 
                file:`${newFile}`,
                // category:{name:"hola"}
                // [{
                //   name:category.name
                // }]
            }, 
            {
                include:"category"
            })

            conexion(result.id,id.id)




            res.json(result)
            
        } catch (error) {
            error?res.send({ msg:"error"}):
            res.send({ msg:error.errors[0]})
        }

    },

    // Update
    async update(req, res) { 
        try {
            console.log("soy fileA",fileA)
            console.log("soy fileA req",req.file)
            const id = await Category.findByPk(req.body.categoryId);
            req.content.title = req.body.title;
            req.content.description = req.body.description;
            req.content.file = `${newFile}`,
           

            deleteConexion(req.content.id)
    
            conexion(req.content.id,id.id)
    
            req.content.save().then(content => {
                res.json(content);
            })
            
        } catch (error) {
            error?res.send({ msg:"error"}):
            res.send({ msg:error.errors[0]})
        }
        
    },


    // Delete
    async delete(req, res) {
        req.content.destroy().then(content => {
            res.json({ msg: "el contenido ha sido eliminado " });
        })
    },


}