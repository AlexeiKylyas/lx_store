var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);


  return {
    admin,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
