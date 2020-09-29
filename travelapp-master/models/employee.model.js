const connection = require('../services/sequelize.service').connection();
const Sequelize = require('sequelize');

const employee = connection.define('employee', {
    empID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    empName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    empFirstName: {
        type: Sequelize.STRING
    },
    empSurName: {
        type: Sequelize.STRING
        
    },
    empSalary:{
        type: Sequelize.DOUBLE(10,2)
    },
    empAccountNo: {
        type: Sequelize.STRING
        
    },
    empStartDate: {
        type: Sequelize.DATEONLY
        
    },
    empEndDate: {
        type: Sequelize.DATEONLY      
    },
    empPhoneNo: {
        type: Sequelize.STRING      
    },
    empAddress: {
        type: Sequelize.STRING      
    },
    empAddressLat: {
        type: Sequelize.DOUBLE(25,10)      
    },
    empAddressLong: {
        type: Sequelize.DOUBLE(25,10)      
    },
    empInsuranceNo: {
        type: Sequelize.STRING      
    }
}
);

module.exports = employee;
