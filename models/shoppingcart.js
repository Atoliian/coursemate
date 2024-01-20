'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ShoppingCart.hasMany(models.ItemHasShoppingCart)
    }
  }
  ShoppingCart.init({
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    desactivatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};