const UserController = require('../controllers/user');
const router = require('express').Router();

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-sign-in', UserController.googleSignIn)
router.get('/username', UserController.getUsername)

module.exports = router