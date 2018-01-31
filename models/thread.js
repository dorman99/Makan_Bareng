'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    judulThread:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
        msg:'maaf, format isian thread name yang anda isi salah'
        },
        isAlpha:{
        msg: 'maaf, format isian thread name yang anda isi salah'
        }
      }
    },
    JenisMakananID: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
        msg:'maaf, format isian makanan anda salah'
        },
        isAlpha:{
        msg: 'maaf, format isian makanan anda salah'
        }
      }
    },
    waktuMulai: DataTypes.STRING,
    waktuBerakhir: DataTypes.STRING,
    location:{
      type:DataTypes.STRING,
      validate:{
        notNull:{
        msg:'maaf, format isian lokasi anda salah'
        },
        isAlpha:{
        msg: 'maaf, format isian lokasi anda salah'
        }
      }
    }
  });
  Thread.associate = function(models){
    Thread.hasMany(models.Makanan)
    Thread.belongsToMany(models.User,{through:"Makanan"})
  }
  return Thread;
};
