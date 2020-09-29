const dbConfig = require('../config').db;
const SequelizeService = require("sequelize");

let sequelize;

module.exports = {
    connect: () => {
        return sequelize = new SequelizeService(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci'
            },
            host: dbConfig.HOST,
            dialect: dbConfig.dialect,
            pool: {
                max: dbConfig.pool.max,
                min: dbConfig.pool.min,
                acquire: dbConfig.pool.acquire,
                idle: dbConfig.pool.idle
            },
            logging: false
        });
    },
    auth : () => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        return sequelize;
    },
    connection : () => {
        return sequelize;
    }
};
