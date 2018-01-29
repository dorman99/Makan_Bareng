'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    judulThread: DataTypes.STRING,
    JenisMakananID: DataTypes.STRING,
    waktuMulai: DataTypes.STRING,
    waktuBerakhir: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Thread;
};