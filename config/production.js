module.exports = {
    port: process.env.PORT || 5000,
    passport: {
        jwtSecret: 'secret',
        google: {
            clientId: '420839143399-4jivvlnf4lv52i6o781b05e1v9jo9qfp.apps.googleusercontent.com',
            secret: 'KUYO-wv3-PbOJ-P5DrCWpTjG'
        }
    },
    aws: {
        iam: {
            region: 'ap-south-1',
            accessKeyId: 'AKIAVORXAR75FULIYPC4',
            secretAccessKey: '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'
        },
        bucket: 'fileupload101'
    },
    db: {
        HOST: "remotemysql.com",
        USER: "XIxq9yLDXe",
        PASSWORD: "uT8YixhQqF",
        DB: "XIxq9yLDXe",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }

};
