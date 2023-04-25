const { Favorite, Food, Category } = require("../models");

module.exports = class FavoriteController {
  static async getAllFavorite(req, res, next) {
    try {
      const CustomerId = req.user.id;
      const favorites = await Favorite.findAll({
        where: { CustomerId },
        order: [['id', 'DESC']],
        include: [
          {
            model: Food,
            attributes: ["id", "name", "description", "price", "imgUrl"],
            include: [
              {
                model: Category,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      });

      favorites.forEach(el => {
        el.Food.dataValues.inFavorite = true
      })
      res.status(200).json({ favorites });
    } catch (error) {
      next(error);
    }
  }

  static async addToFavorite(req, res, next) {
    try {
      const CustomerId = req.user.id;
      const FoodId = req.params.foodId;
      const [favorite, created] = await Favorite.findOrCreate({
        where: { CustomerId: req.user.id, FoodId: req.params.foodId },
      });

      // ini harusnya jadi error atau enggak?
      if (!created) return res.status(200).json({ message: "Food already in favorites" });

      res.status(200).json({
        id: favorite.id,
        CustomerId: favorite.CustomerId,
        FoodId: favorite.FoodId,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getFavoriteById(req, res, next) {
    try {
      const id = req.params.id;
      const favorite = await Favorite.findByPk(id);
      res.status(200).json({ favorite });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavoriteById(req, res, next) {
    try {
      const id = req.params.id;
      await Favorite.destroy({ where: { id }});
      res.status(200).json({ message: "Food removed from favorites" })
    } catch (error) {
      next(error)
    }
  }
};
