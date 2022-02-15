const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, OrderItem }) {
      Order.belongsTo(User, { foreignKey: 'user_id' });
      Order.hasMany(OrderItem, { foreignKey: 'order_id' });
    }
  }
  Order.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
