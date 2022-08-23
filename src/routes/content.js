const { Router } = require('express');
const router = Router();

const auth = require('../middleware/authenticate');
const ContentController = require('../controllers/contentControler');
const PoliContent = require('../policies/PoliContent'); 
const { upload } = require('../controllers/contentControler');

router.get('/', auth, ContentController.index); 
router.get('/category', auth, ContentController.getCategory); 
router.post('/create',auth, PoliContent.create, upload.single('myFile'), ContentController.create  );
router.get('/:id', auth, ContentController.find, PoliContent.showC, ContentController.show);
router.put('/:id', auth, ContentController.find, PoliContent.updateC, upload.single('myFile'), ContentController.update);
router.delete('/:id', auth, ContentController.find, PoliContent.deleteC, ContentController.delete);

module.exports = router; 