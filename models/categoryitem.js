'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoryItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.CategoryItem.hasMany(models.Item)
    }
  }
  CategoryItem.init({
    wording: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CategoryItem ',
  });
  return CategoryItem;
};