'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Item.hasMany(models.ItemHasShoppingCart)
      models.Item.belongsTo(models.CategoryItem, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  Item.init({
    wording: DataTypes.STRING,
    categoryItemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item',
  });
  return Item;
};