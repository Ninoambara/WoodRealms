'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CustomerProduct.belongsTo(models.Customer, {foreignKey: "CustomerId"})
      CustomerProduct.belongsTo(models.Product, {foreignKey:"ProductId"})
    }
  }
  CustomerProduct.init({
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Customer is required"
        },
        notEmpty:{
          msg: "Customer is required"
        }
      }
    },
    ProductId:  {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: "Product is required"
        },
        notEmpty:{
          msg: "Product is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'CustomerProduct',
  });
  return CustomerProduct;
};