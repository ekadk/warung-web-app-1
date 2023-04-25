const FoodController = require('../controllers/food');
const {authorization, changeStatusAuthorization} = require('../middlewares/authorization');
const router = require('express').Router();

router.get('/', FoodController.getAllFood)
router.get('/logs', FoodController.getLogs)
router.post('/', FoodController.addFood)
router.get('/:id', authorization, FoodController.getById)
router.put('/:id', authorization, FoodController.editFoodById)
router.delete('/:id', authorization, FoodController.deleteById)
router.patch('/:id', changeStatusAuthorization, FoodController.changeStatusById)

module.exports = router