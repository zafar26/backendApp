const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const hotel = connection.define('hotel', {
    hotID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    hotName: {
        type: Sequelize.STRING
    },
    hotNameAr: {
        type: Sequelize.STRING
    },
    hotPricePerNight:{
        type: Sequelize.DOUBLE(10,2)
    },
    hotPriceCurrency: {
        type: Sequelize.STRING
    },
    hotPriceCurrencyAr: {
        type: Sequelize.STRING
    },
    hotAddress: {
        type: Sequelize.STRING
    },
    hotAddressAr: {
        type: Sequelize.STRING
    },
    hotLat: {
        type: Sequelize.DOUBLE(25,10)
    },
    hotLong: {
        type: Sequelize.DOUBLE(25,10)
    },
    hotTelephoneNo: {
        type: Sequelize.STRING
    },
    hotContactEmail: {
        type: Sequelize.STRING
    },
    hotContactEmailAr: {
        type: Sequelize.STRING
    }

}
);

module.exports = hotel;
