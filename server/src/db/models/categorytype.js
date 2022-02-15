const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategoryType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Type, Category, Item }) {
      CategoryType.belongsTo(Type, { foreignKey: 'type_id' });
      CategoryType.belongsTo(Category, { foreignKey: 'category_id' });
      CategoryType.hasMany(Item, { foreignKey: 'categoryType_id' });
    }
  }
  CategoryType.init(
    {
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Types',
          key: 'id',
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'CategoryType',
    }
  );
  return CategoryType;
};
