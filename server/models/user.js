'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Food, { foreignKey: 'authorId' })
      User.hasMany(models.Favorite, { foreignKey: 'CustomerId'})
    }
  }
  User.init({
    username: {
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already used!'
      },
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Username required'
        },
        notEmpty: {
          msg: 'Username required'
        },    
      }
    },
    email: {
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already used!'
      },
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Email required'
        },
        notEmpty: {
          msg: 'Email required'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Password required'
        },
        notEmpty: {
          msg: 'Password required'
        },    
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: 'Role required'
        },
        notEmpty: {
          msg: 'Role required'
        },    
      }
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password)
  })

  return User;
};