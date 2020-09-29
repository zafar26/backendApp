const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const booking = connection.define('booking', {
    bookID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },  
    bookNoOfPackPurchased: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}
);

module.exports = booking;
