const { Category } = require('../models');

module.exports = class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll()
      res.status(200).json({ categories })
    } catch (error) {
      next(err)
    }
  }
  static async newCategory(req, res, next) {
    try {
      const { name } = req.body
      await Category.create({ name })
      res.status(201).json({ message: 'new category created' })
    } catch (error) {
      next(error)
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id
      await Category.destroy({where: { id }})
      res.status(200).json({ message: 'category deleted succesfully' })
    } catch (error) {
      next(error)
    }
  }
}
