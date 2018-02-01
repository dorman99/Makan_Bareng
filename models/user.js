'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'format email yang kamu masukan salah'
        },
        isUnique: function (value, next) {
          User.findAll({
            where: {
              email: value.toLowerCase(),
              id: {
                [sequelize.Op.ne]: this.id
              }
            }
          })
            .then((data) => {
              if (data == null || data.length == 0) {
                return next()
              } else {
                return next(`email ${data[0].email} sudah digunakan`)
              }
            })
            .catch((err) => {
              return next(err)
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        isAlphanumeric: {
          msg: 'password : tidak boleh ada spesial character ex:!@#$_ dan spasi '
        }
      }
    },
    role: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function (value, next) {
          User.findAll({
            where: {
              username: value.toLowerCase(),
              id: {
                [sequelize.Op.ne]: this.id
              }
            }
          })
            .then((data) => {
              if (data == null || data.length == 0) {
                return next()
              } else {
                return next(`username ${data[0].username} sudah digunakan`)
              }
            })
            .catch((err) => {
              return next(err)
            })
        },
        notEmpty :{
          msg : 'username tidak boleh kosong'
        },
        isAlphanumeric:{
          msg:'username : tidak boleh ada spesial character ex:!@#$_ dan spasi '
        }
      }

    }
  });
  User.associate = function(models){
    User.hasMany(models.Makanan)
    User.belongsToMany(models.Thread,{through:"Makanan"})
  }

  User.beforeCreate((user, options) => {
    console.log('masuk')
    return bcrypt.hash(user.password, saltRounds).then(function (hashed) {
        user.password = hashed
    });;
  });

  User.prototype.comparePassWord = function (passInput,cb) {
    // console.log('masuk')
   bcrypt.compare(passInput, this.password).then(function (result) {
      if(result){
        cb(result)
      }else{
        cb(result)
      }
    });
  }

  return User;
};
