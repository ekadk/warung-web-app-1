const { decodeToken } = require("../helpers/jwt");
const { Food, User, Category, Log, Favorite } = require("../models");
const { Op } = require("sequelize");
module.exports = class FoodController {
  static async addFood(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const food = await Food.create({
        name,
        description,
        price,
        imgUrl,
        authorId: req.user.id,
        categoryId,
      });

      const message = `food with id ${food.id} created`;

      await Log.create({
        productName: food.name,
        description: message,
        updatedBy: req.user.email,
      });

      res.status(201).json({ food });
    } catch (error) {
      next(error);
    }
  }

  static async getAllFood(req, res, next) {
    try {
      const options = {
        attributes: ["id", "name", "description", "price", "imgUrl", "status"],
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
      };

      let food = await Food.findAll(options);
      food = food.map((el) => {
        if (req.user.role === "Admin") {
          el.dataValues.canChangeStatus = true;
          el.dataValues.canEdit = true;
        } else {
          el.canChangeStatus = false;

          if (req.user.id === el.User.id) {
            el.dataValues.canEdit = true;
          } else {
            el.dataValues.canEdit = false;
          }
        }
        return el;
      });
      res.status(200).json({ food });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id;
      const options = {
        attributes: ["id", "name", "description", "price", "imgUrl"],
        include: [
          {
            model: User,
            attributes: ["id", "email", "username"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
      };
      const food = await Food.findByPk(id, options);
      if (!food) {
        throw { name: "food_not_found", foodId: id };
      }
      res.status(200).json({ food });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req, res, next) {
    try {
      const id = req.params.id;
      const food = await Food.findByPk(id);
      if (!food) {
        throw { name: "food_not_found", foodId: id };
      }
      await Food.destroy({ where: { id } });
      res
        .status(200)
        .json({ message: `product with id ${id} deleted successfully` });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatusById(req, res, next) {
    try {
      const id = req.params.id;
      const food = await Food.findByPk(id);
      const status = req.body.status;
      const initStatus = food.status;
      if (!food) {
        throw { name: "food_not_found", foodId: id };
      }
      if (status !== food.status) {
        await Food.update({ status }, { where: { id } });
        const message = `product with id ${id} status changed from ${initStatus} to ${status}`;

        await Log.create({
          productName: food.name,
          description: message,
          updatedBy: req.user.email,
        });

        res.status(200).json({ message });
      } else {
        res.status(200).json({ message: "product status not changed" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async editFoodById(req, res, next) {
    try {
      const id = req.params.id;
      const food = await Food.findByPk(id);
      const { name, description, price, imgUrl, categoryId } = req.body;

      await Food.update(
        { name, description, price, imgUrl, categoryId },
        { where: { id } }
      );

      const message = `product with id ${id} updated`;

      await Log.create({
        productName: food.name,
        description: message,
        updatedBy: req.user.email,
      });

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async getLogs(req, res, next) {
    try {
      const logs = await Log.findAll({
        attributes: ["productName", "description", "updatedBy", "updatedAt"],
        order: [["updatedAt", "DESC"]],
      });
      res.status(200).json({ logs });
    } catch (error) {
      next(error);
    }
  }

  static async customerGetAllFood(req, res, next) {
    let options = {
      where: { status: "Active" },
      attributes: ["id", "name", "description", "price", "imgUrl"],
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
      limit: 9,
      offset: req.query.page ? (req.query.page - 1) * 9 : 0,
      order: [["id", "ASC"]],
      distinct: true,
    };

    // If logged in, include data from Favorite
    if (req.headers.access_token) {
      options.include.push({
        model: Favorite,
        attributes: ["CustomerId"],
      });
    }

    // Add Search Filter
    if (req.query.search) {
      options.where.name = { [Op.iLike]: `%${req.query.search}%` };
    }

    // Add Category Filter
    if (req.query.category) {
      options.include[0].where = { name: { [Op.like]: req.query.category } };
    }

    // Add Price Filter
    if (req.query.minPrice && !req.query.maxPrice) {
      options.where.price = { [Op.gte]: req.query.minPrice };
    }

    if (!req.query.minPrice && req.query.maxPrice) {
      options.where.price = { [Op.lte]: req.query.maxPrice };
    }

    if (req.query.minPrice && req.query.maxPrice) {
      options.where.price = {
        [Op.gte]: req.query.minPrice,
        [Op.lte]: req.query.maxPrice,
      };
    }

    try {
      const { rows, count } = await Food.findAndCountAll(options);
      const totalPages = Math.ceil(count / 9);

      //if logged in, change relevant Favorite data to inWishlist tag
      if (req.headers.access_token) {
        const customerId = decodeToken(req.headers.access_token);
        rows.forEach((food) => {
          food.dataValues.inFavorite = false;
          if (food.Favorites) {
            for (let index = 0; index < food.Favorites.length; index++) {
              const element = food.Favorites[index];
              if (element.dataValues.CustomerId === customerId.id) {
                food.dataValues.inFavorite = true;
                break;
              }
            }
          }
          delete food.dataValues.Favorites;
        });
      }

      const data = {
        count,
        totalPages,
        currentPage: options.offset / options.limit + 1,
        food: rows,
      };

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async customerGetById(req, res, next) {
    try {
      const id = req.params.id;
      const options = {
        attributes: ["id", "name", "description", "price", "imgUrl"],
        where: {
          id,
          status: "Active",
        },
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
      };

      if (req.headers.access_token) {
        options.include.push({
          model: Favorite,
          attributes: ["CustomerId"],
        });
      }
      const food = await Food.findOne(options);
      if (!food) {
        throw { name: "food_not_found", foodId: id };
      }

      //if logged in, change relevant Favorite data to inWishlist tag
      if (req.headers.access_token) {
        const customerId = decodeToken(req.headers.access_token);
          food.dataValues.inFavorite = false;
          if (food.Favorites) {
            for (let index = 0; index < food.Favorites.length; index++) {
              const element = food.Favorites[index];
              if (element.dataValues.CustomerId === customerId.id) {
                food.dataValues.inFavorite = true;
                break;
              }
            }
          }
          delete food.dataValues.Favorites;
      }
      
      res.status(200).json({ food });
    } catch (error) {
      next(error);
    }
  }
};
