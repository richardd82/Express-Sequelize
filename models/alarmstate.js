'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AlarmState extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AlarmState.init({
    state: DataTypes.ENUM('encendida', 'apagada'),
    allowNull: false
  },
   {
    sequelize,
    modelName: 'AlarmState',
  });
  return AlarmState;
};