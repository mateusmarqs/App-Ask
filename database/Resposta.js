const Sequelize = require('sequelize')
const connection = require('./database')

const Reposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Reposta.sync({
    force: false
})

module.exports= Reposta
