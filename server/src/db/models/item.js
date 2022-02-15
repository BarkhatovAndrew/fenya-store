const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderItem, Review, CategoryType }) {
      Item.hasOne(OrderItem, { foreignKey: 'item_id' });
      Item.hasMany(Review, { foreignKey: 'item_id' });
      Item.belongsTo(CategoryType, { foreignKey: 'categoryType_id' });
    }
  }
  Item.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryType_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'CategoryTypes',
          key: 'id',
        },
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
