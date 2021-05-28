const Sequelize = require("sequelize")

const connection = new Sequelize('guiaperguntas', 'root', '123456', {
    host: 'localhost',
    //qual tipo de banco
    dialect: 'mysql'
})

module.exports = connection
