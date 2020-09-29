const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const continent = connection.define('continent', {
    contID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    contName: {
        type: Sequelize.STRING,
        unique: true
    },
    contNameAr: {
        type: Sequelize.STRING,
        unique: true
    }

}
);
module.exports = continent;
