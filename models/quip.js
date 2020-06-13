'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('quip', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    quip: {
      type: DataTypes.STRING
    }
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};