const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lx_store', 'root', 'Sobaka282001', {
    host: 'db',
    dialect: 'mysql'
});

module.exports = sequelize;
