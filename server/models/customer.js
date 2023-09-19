'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.CustomerProduct, {foreignKey: "CustomerId"})
    }
  }
  Customer.init({
    username: {
      allowNull:false,
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg: "Username is required"
        },
        notEmpty:{
          msg: "Username is required"
        },
      }
    },
    email:{
      allowNull:false,
      type: DataTypes.STRING,
      unique:{
        msg: "Email is already exist"
      },
      validate:{
        notNull:{
          msg: "Email is required"
        },
        notEmpty:{
          msg: "Email is required"
        },
        isEmail:{
          msg: "Wrong email format"
        }
      }
    },
    password: {
      allowNull:false,
      type: DataTypes.STRING,
      validate:{
        notNull:{
          msg: "Password is required"
        },
        notEmpty:{
          msg: "Password is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate((customer) => {
    customer.password = hashPass(customer.password)
  })
  return Customer;
};