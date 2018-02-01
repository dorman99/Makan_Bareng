'use strict';
module.exports = (sequelize, DataTypes) => {
  var Makanan = sequelize.define('Makanan', {
    UserId: DataTypes.INTEGER,

    ThreadId: DataTypes.INTEGER,
    role:DataTypes.STRING,
    namaMakanan: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'kamu harus bawa makannan juga dong'
        }
      }
    }
  });
  Makanan.associate = function(models){
    Makanan.belongsTo(models.User)
    Makanan.belongsTo(models.Thread)
  }
  return Makanan;
};
