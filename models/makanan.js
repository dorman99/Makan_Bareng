'use strict';
module.exports = (sequelize, DataTypes) => {
  var Makanan = sequelize.define('Makanan', {
    UserId: DataTypes.INTEGER,

    ThreadId: DataTypes.INTEGER,
    role:DataTypes.STRING
  });
  Makanan.associate = function(models){
    Makanan.belongsTo(models.User)
    Makanan.belongsTo(models.Thread)
  }
  return Makanan;
};
