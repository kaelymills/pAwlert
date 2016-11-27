"use strict";

module.exports = function(sequelize, DataTypes) {
  var Note = sequelize.define("Note", {
    name: DataTypes.STRING,
    crime_id: DataTypes.INTEGER,
  }, {
    underscored: true,

    freezeTableName: true,

    tableName: 'notes',

    classMethods: {
      associate: function(models) {
        Note.belongsTo(models.User, {
          onDelete: "CASCADE",
          hooks: true,
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });

  return Note;
};