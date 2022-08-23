const { Router } = require('express');
const router = Router();
const content = require('./content');
const user = require('./user');

const AuthController = require('../controllers/authController');


router.get('/', (req, res) => res.json({ hello: "World" }));
router.post('/signin', AuthController.signIn);
router.post('/signup', AuthController.signUp);
router.use('/content', content);
router.use('/user', user);

module.exports = router;