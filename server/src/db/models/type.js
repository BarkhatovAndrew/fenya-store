const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CategoryType }) {
      Type.hasMany(CategoryType, { foreignKey: 'type_id' });
    }
  }
  Type.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Type',
    }
  );
  return Type;
};
