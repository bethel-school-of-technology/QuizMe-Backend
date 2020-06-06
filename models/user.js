'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.INTEGER
    },
    points: {
        type: DataTypes.INTEGER
    },
    admin: {
        type: DataTypes.BOOLEAN
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};