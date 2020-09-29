const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const position = connection.define('position', {
    posID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    posName: {
        type: Sequelize.STRING,
        unique: true
    },
    posNameAr: {
        type: Sequelize.STRING,
        unique: true
    },
    posBaseSalary:{
        type: Sequelize.DOUBLE(10,2),
        allowNull: false
    },
    posBaseSalaryCurrency:{
        type: Sequelize.STRING
    },
    posBaseSalaryCurrencyAr:{
        type: Sequelize.STRING
    }
}
);
module.exports = position;
