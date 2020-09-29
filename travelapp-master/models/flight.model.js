const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const flight = connection.define('flight', {
    fliID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    // fliStartPoint: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
        
    // },
    // fliEndPoint: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
        
    // },
    fliStartTime: {
        type: Sequelize.DATE,
        allowNull: false
        
    },
    fliEndTime: {
        type: Sequelize.DATE,
        allowNull: false
        
    },
    fliClass: {
        type: Sequelize.ENUM,
        values: ['First', 'Business', 'Economy']        
    },
    fliLayoverBool: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
        
    },
    fliLayoverNo: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
        allowNull: false
        
    },
    fliLayoverPos: {
        type: Sequelize.BOOLEAN
        
    },
    // fliLayoverLoc: {
    //     type: Sequelize.INTEGER
        
    // },
    fliLayoverDuration: {
        type: Sequelize.DOUBLE(4,2)
        
    },
    fliPrice: {
        type: Sequelize.DOUBLE(4,3)
        
    },
    fliPriceCurrency: {
        type: Sequelize.STRING
        
    },
    fliPriceCurrencyAr: {
        type: Sequelize.STRING
        
    }

}
);

module.exports = flight;
