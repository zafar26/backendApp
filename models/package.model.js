const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const package = connection.define('package', {
    packID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    packTitle: {
        type: Sequelize.STRING,
    },
    packTitleAr: {
        type: Sequelize.STRING,
    },
    packDescription: {
        type: Sequelize.TEXT
    },
    packDescriptionAr: {
        type: Sequelize.TEXT
    },
    packDuration: {
        type: Sequelize.INTEGER
    },
    packPrice: {
        type: Sequelize.DOUBLE(10,2)
    },
    packPriceCurrency: {
        type: Sequelize.DOUBLE(10,2)
    },
    packPriceCurrencyAr: {
        type: Sequelize.DOUBLE(10,2)
    },
    packPplNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    packStartDate: {
        type: Sequelize.DATEONLY,
        allowNull: false  
    },
    packEndDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
        
    },
    packDiscountAt: {
        type: Sequelize.INTEGER,    
    },
    packDiscountAmnt: {
        type: Sequelize.DOUBLE(4,2),    
    },
    packTransportIncluded: {
        type: Sequelize.BOOLEAN,
        defaultValue: false    
    }

}
);

module.exports = package;
