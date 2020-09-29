const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');


const city = connection.define('city', {
    citID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    citName: {
        type: Sequelize.STRING,
    },
    citNameAr: {
        type: Sequelize.STRING,
    }

},
{
    uniqueKeys: {
        Items_unique1: {
            fields: ['citName', 'id_country']
        },
        Items_unique2: {
            fields: ['citNameAr', 'id_country']
        }
    }
}
);
module.exports = city;
