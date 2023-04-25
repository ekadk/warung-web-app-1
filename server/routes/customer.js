const CustomerController = require('../controllers/customer');
const FavoriteController = require('../controllers/favorite');
const FoodController = require('../controllers/food');
const Authentication = require('../middlewares/authentication');
const { customerAuthorization } = require('../middlewares/authorization');
const router = require('express').Router();

router.post('/register', CustomerController.register)
router.post('/login', CustomerController.login)
router.post('/google-sign-in', CustomerController.googleSignIn)
router.get('/username', CustomerController.getUsername)
router.get('/food', FoodController.customerGetAllFood)
router.get('/food/:id', FoodController.customerGetById)

router.use(Authentication.user)
router.get('/favorites', FavoriteController.getAllFavorite)
router.post('/favorites/:foodId', FavoriteController.addToFavorite)
// router.get('/favorites/:id', customerAuthorization, FavoriteController.getFavoriteById)
router.delete('/favorites/:id', customerAuthorization, FavoriteController.deleteFavoriteById)

module.exports = router