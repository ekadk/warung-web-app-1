'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.Food)
      Favorite.belongsTo(models.User, { foreignKey: 'CustomerId' })
    }
  }
  Favorite.init({
    CustomerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
      validate: {
        notNull: {
          msg: "User required",
        },
        notEmpty: {
          msg: "User required",
        },
      },
    },
    FoodId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: "Food",
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
      validate: {
        notNull: {
          msg: "Food required",
        },
        notEmpty: {
          msg: "Food required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};