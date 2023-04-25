"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.User, { foreignKey: "authorId" });
      Food.belongsTo(models.Category, { foreignKey: "categoryId" });
      Food.hasMany(models.Favorite)
    }
  }
  Food.init(
    {
      name: {
        allowNull: false,
        unique: {
          args: true,
          msg: "Name already used!",
        },
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Name required",
          },
          notEmpty: {
            msg: "Name required",
          },
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: {
            msg: "Description required",
          },
          notEmpty: {
            msg: "Description required",
          },
        },
      },
      price: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          notNull: {
            msg: "Price required",
          },
          notEmpty: {
            msg: "Price required",
          },
          min: {
            args: 5000,
            msg: "min price is 5000",
          },
        },
      },
      imgUrl: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "Image URL required",
          },
          notEmpty: {
            msg: "Image URL required",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        validate: {
          notNull: {
            msg: "Category required",
          },
          notEmpty: {
            msg: "Category required",
          },
        },
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: {
            msg: "status required",
          },
          notEmpty: {
            msg: "status required",
          },
        },
        defaultValue: "Active"
      },
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
