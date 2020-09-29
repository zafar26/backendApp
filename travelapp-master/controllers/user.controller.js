const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config');


exports.register = (req, res) => {
    const _b = req.body;
    console.log(_b);
    if (_b.registrationType === 'google') {
        res.send('redirect to /user/auth/google');
    }
    if (!_b.email) {
        res.status(400).send({ message: "Email cannot be null" });
    }
    else if (!_b.password) {
        res.status(400).send({ message: "Password cannot be null" });
    }
    else if (!_b.usrType && !_b.usrTypeAr) {
        res.status(400).send({ message: "user type cannot be null" });
    }
    else if (!_b.usrName) {
        res.status(400).send({ message: "user name cannot be null" });
    }
    else {
        User.findOne({
            where: {
                usrEmail: _b.email
            },
            attributes: ['usrID']
        })
            .then(u => {
                if (u) {
                    res.status(400).send({
                        status: false,
                        message: "Email already registered"
                    });
                }
                else {
                    User.create({
                        usrEmail: _b.email,
                        usrPassword: bcrypt.hashSync(_b.password, 0),
                        usrName: _b.usrName,
                        usrFirstName: _b.firstName,
                        usrSurName: _b.lastName,
                        usrType: _b.usrType,
                        usrTypeAr: _b.usrTypeAr,
                        usrCardNo: _b.cardNo,
                        usrSocialSecurityNo: _b.socialSecurityNo,
                        usrAddress: _b.address,
                        usrAddressAr: _b.addressAr,
                        usrLat: _b.lat,
                        usrLong: _b.long,
                        emailVerified: true // set to false in production
                    })
                        .then(data => {
                            const auth = `bearer ${jwt.sign(data.usrID, config.passport.jwtSecret)}`;
                            // mailer(auth);
                            res.status(200).send({
                                status: true,
                                message: "Registered Successfully"
                            });
                        })
                        .catch(e => {
                            console.error(e);
                            res.status(400).send({
                                message: "internal error"
                            });
                        });
                }
            })
            .catch(e => {
                console.error(e);
                res.status(400).send({
                    message: "internal error"
                });
            });
    }
};


exports.login = (req, res) => {
    const _b = req.body;
    if (!_b.email) {
        res.status(400).send({ message: "Email cannot be null" });
    }
    else if (!_b.password) {
        res.status(400).send({ message: "Password cannot be null" });
    }
    else {
        User.findOne({
            where: {
                usrEmail: _b.email
            }
        })
            .then(u => {
                if (u) {
                    if (!u.emailVerified) {
                        res.status(401).json({
                            status: false,
                            message: "Email not Verified"
                        });
                    }
                    else if (!bcrypt.compareSync(_b.password, u.usrPassword)) {
                        res.status(401).json({
                            status: false,
                            message: "wrong password"
                        });
                    }
                    else {
                        const auth = `bearer ${jwt.sign(u.usrID, config.passport.jwtSecret)}`;
                        res.status(200).json({
                            ...u.dataValues,
                            auth: auth,
                            status: true
                        });
                    }
                }
                else {
                    res.status(400).json({
                        status: false,
                        message: "email not found"
                    });
                }
            })
            .catch(e => {
                console.error(e);
                res.status(400).json({
                    status: false,
                    message: "internal error"
                });
            });
    }
};






// exports.getOne = (req, res) => {
//     const _b = req.body;
//     let userId = _b.userId;
//     User.findOne(
//         {
//             where: {
//                 id: userId
//             },
//             attributes: ['id', 'userName','firstName', 'lastName', 'score', 'email', [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y-%m-%d') , 'registrationDate']] // toAdd rank, completed Contents and challenges won
//         }
//     )
//         .then(u => {
//             if (!u) {
//                 res.status(404).json({
//                     status: false,
//                     message: 'user not found'
//                 });
//             }
//             else {
//                 res.status(200).json({
//                     status: true,
//                     result: u
//                 });
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };


// exports.getAll = (req, res) => {
//     User.findAll(
//         {

//             attributes: ['id', 'userName','firstName', 'lastName', 'score', 'email', [Sequelize.fn('date_format', Sequelize.col('createdAt'), '%Y-%m-%d') , 'registrationDate']] // toAdd rank, completed Contents and challenges won
//         }
//     )
//         .then(u => {
//             if (!u) {
//                 res.status(404).json({
//                     status: false,
//                     message: 'user not found'
//                 });
//             }
//             else {
//                 res.status(200).json({
//                     status: true,
//                     result: u
//                 });
//             }
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };

// exports.updateProfile = (req, res) => {
//     const _b = req.body;
//     User.update({
//         userName: _b.userName,
//         firstName: _b.firstName,
//         lastName: _b.lastName,
//         mobileNumber: _b.mobileNumber,
//         countryId: _b.countryId,
//         cityId: _b.cityId,
//         deviceId: _b.deviceId,
//         deviceToken: _b.deviceToken,
//         deviceName: _b.deviceName,
//         deviceType: _b.deviceType,
//     }, {
//         where: {
//             id: req.user.id,
//         }
//     })
//         .then(u => {
//             res.status(200).json({ ...u.dataValues, status: true });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };

// exports.changePassword = (req, res) => {
//     const _b = req.body;
//     if (typeof _b.newPassword !== 'string' || typeof _b.oldPassword !== 'string') {
//         try {
//             _b.oldPassword = _b.oldPassword.toString();
//             _b.newPassword = _b.newPassword.toString();
//         }
//         catch (err) {
//             if (err) throw err;
//         }
//     }
//     else if (!bcrypt.compareSync(_b.oldPassword, req.user.password)) res.status(401).json({ status: false, message: 'wrong password' });
//     else {
//         _b.newPassword = bcrypt.hashSync(_b.newPassword, 0);
//         User.update({
//             password: _b.newPassword,
//         }, {
//             where: {
//                 id: req.user.id,
//             }
//         })
//             .then(u => {
//                 res.status(200).json({ status: true });
//             })
//             .catch(err => {
//                 console.error(err);
//                 res.status(400).json({ status: false });
//             });
//     }
// };

// exports.forgotPassword = (req, res) => {
//     const _b = req.body;
//     if (!_b.email || typeof _b.email !== 'string') {
//         res.status(400).json({
//             status: false,
//             message: 'Email must be a string'
//         });
//     }
//     else {
//         User.findOne(
//             {
//                 where: {
//                     email: _b.email
//                 }
//             }
//         )
//             .then(u => {
//                 if (!u) {
//                     res.status(400).json({
//                         status: false,
//                         message: 'email not found'
//                     });
//                 }
//                 else {
//                     // send email with auth
//                     // send the auth back to /changePassword to reset password
//                     const auth = `bearer ${jwt.sign(u.id, config.passport.jwtSecret)}`;
//                     mailer(auth);
//                     res.status(200).json({ status: true });
//                 }
//             })
//             .catch(err => {
//                 console.error(err);
//                 res.status(400).json({ status: false });
//             });
//     }
// };

// exports.verifyEmail = (req, res) => {
//     User.update({
//         emailVerified: true,
//     }, {
//         where: {
//             id: req.user.id,
//         }
//     })
//         .then(u => {
//             res.status(200).json({ status: true });
//         })
//         .catch(err => {
//             console.error(err);
//             res.status(400).json({ status: false });
//         });
// };

// exports.leaderBoard = (req, res) => {
//     const _b = req.body;
//     let opts = {};
//     if (_b.startRange) {
//         opts = {
//             offset: +_b.startRange,
//             limit: +_b.count
//         }
//     }
//     User.findAndCountAll(
//         {
//             where: {
//                 guest: false,
//                 emailVerified: true
//             },
//             order: [['score', 'DESC']],
//             attributes: ['id', 'userName', 'score'],
//             ...opts
//         }
//     )
//         .then((data) => {

//             let arr = data.rows.map(d => d.dataValues);
//             console.log(arr);
//             for (let i = 0; i < arr.length; i++) {
//                 arr[i].rank = (+_b.startRange + i + 1);
//             }
//             res.status(200).json({ status: true, result: arr });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).json({ status: false });
//         })
// };


// exports.leaderBoard = (req, res) => {
    
//     User.findAll(
//         {
//             where: {
//                 guest: false,
//                 emailVerified: true
//             },
//             raw : true,
//             limit: 10,
//             order: [['score', 'DESC']],
//             attributes: ['id', 'userName', 'score'],
//         }
//     )
//         .then((data) => {
//             console.log(data);
//             for (let i = 0; i < data.length; i++) {
//                 data[i].rank = (i + 1);
//             }
//             res.status(200).json({ status: true, result: data });
//         })
//         .catch(err => {
//             console.log(err);   
//             res.status(400).json({ status: false });
//         })
// };
