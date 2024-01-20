'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemHasShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ItemHasShoppingCart.belongsTo(models.shoppingCart, {
        foreignKey: {
          allowNull: false
        }
      })
      models.ItemHasShoppingCart.belongsTo(models.item, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  ItemHasShoppingCart.init({
    itemId: DataTypes.INTEGER,
    shoppingCartId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ItemHasShoppingCart',
  });
  return ItemHasShoppingCart;
};