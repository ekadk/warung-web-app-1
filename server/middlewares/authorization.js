const { Food, Favorite } = require("../models");

async function authorization(req, res, next) {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      throw { name: "food_not_found", foodId: req.params.id };
    }

    if (req.user.role !== "Admin") {
      if (food.authorId !== req.user.id) {
        throw { name: "not_authorized" };
      }
    }

    next();
  } catch (error) {
    next(error);
  }
}

async function changeStatusAuthorization(req, res, next) {
  try {
    const food = await Food.findByPk(req.params.id);
    if (!food) {
      throw { name: "food_not_found", foodId: req.params.id };
    }

    if (req.user.role !== "Admin") throw { name: "not_authorized" };
    next();
  } catch (error) {
    next(error);
  }
}

async function customerAuthorization(req, res, next) {
  try {
    const id = +req.params.id
    console.log({ id });
    const favorite = await Favorite.findByPk(id);
    console.log(favorite);
    // const CustomerId = req.user.id
    // console.log(favorite);
    // console.log({
    //   CustomerId: favorite.CustomerId,
    //   UserId: req.user.id
    // });
    // if(favorite.CustomerId !== req.user.id) throw { name: "not_authorized" }; 
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { authorization, changeStatusAuthorization, customerAuthorization };
