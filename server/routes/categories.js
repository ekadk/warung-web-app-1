const CategoryController = require('../controllers/category');
const router = require('express').Router();

router.get('/', CategoryController.getAllCategories)
router.post('/', CategoryController.newCategory)
router.delete('/:id', CategoryController.deleteCategory)

module.exports = router