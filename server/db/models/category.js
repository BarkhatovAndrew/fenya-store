const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CategoryType }) {
      Category.hasMany(CategoryType, { foreignKey: 'category_id' });
    }
  }
  Category.init({
    name: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
