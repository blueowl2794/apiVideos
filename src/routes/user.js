const { Router } = require('express');
const router = Router();

const auth = require('../middleware/authenticate')
const UserController = require('../controllers/userControler');
const PoliContent = require('../policies/PoliContent')

router.get('/', auth, UserController.index);
router.get('/roles', auth, UserController.getRole);
router.post('/create', auth, PoliContent.create, UserController.create);
router.get('/:id', auth,  UserController.find, PoliContent.show, UserController.show);
router.put('/:id', auth, UserController.find, PoliContent.update, UserController.update);
router.delete('/:id', auth, UserController.find, PoliContent.delete, UserController.delete);

module.exports = router;