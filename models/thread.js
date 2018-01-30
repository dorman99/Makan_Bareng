'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    judulThread: DataTypes.STRING,
    JenisMakananID: DataTypes.STRING,
    waktuMulai: DataTypes.STRING,
    waktuBerakhir: DataTypes.STRING
  });
  Thread.associate = function(models){
    Thread.hasMany(models.Makanan)
    Thread.belongsToMany(models.User,{through:"Makanan"})
  }
  return Thread;
};
