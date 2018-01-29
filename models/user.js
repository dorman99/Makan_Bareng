'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'format yang kamu masukan salah'
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
    role : DataTypes.STRING,
    password : DataTypes.STRING
  });
  return User;
};