'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    judulThread:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
        msg:'maaf, input tidak boleh kosong'
        }
      }
    },
    JenisMakananID: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
        msg:'maaf, format isian input tidak boleh kosong'
        },
      }
    },
    waktuMulai: {
      type: DataTypes.STRING,
      validate :{
        notEmpty :{
          msg :'input waktu mulai tidak boleh kosong'
        }
      }
    },
    waktuBerakhir: {
      type: DataTypes.STRING,
      validate:{
        notEmpty: {
          msg: 'input waktu berakhir tidak boleh kosong'
        }
      }
    },
    location:{
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
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
