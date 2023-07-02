'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Chat.init({
    chat_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pw_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Chat',
    defaultScope: {
      attributes: {
        exclude: ["pw_hash", "createdAt", "id"]
      }
    }
  });
  return Chat;
};