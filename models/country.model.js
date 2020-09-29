const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const country = connection.define('country', {
    ctryID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    ctryName: {
        type: Sequelize.STRING,
    },
    ctryNameAr: {
        type: Sequelize.STRING,
    }

}
);
module.exports = country;
