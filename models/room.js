'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // A room can have many categories.
      models.room.belongsToMany(models.category, { through: "categoriesRooms" });
      // A room has many comments.
      models.room.hasMany(models.comment);
    }
  };
  room.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};