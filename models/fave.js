"use strict";

module.exports = function(sequelize, DataTypes) {
  var Fave = sequelize.define("Fave", {
    fave_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    crime_id: DataTypes.INTEGER,
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'faves',
  });

  return Fave;
};