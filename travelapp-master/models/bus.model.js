const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const bus = connection.define('bus', {
    busID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
}
);

module.exports = bus;
