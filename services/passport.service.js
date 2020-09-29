const JwtStrategy = require('passport-jwt').Strategy,
 ExtractJwt = require('passport-jwt').ExtractJwt;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user.model');
const passportService = require('passport');
const config = require('../config');


const opts = {
    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.passport.jwtSecret
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
    },
    google: {
        clientID: config.passport.google.clientId,
        clientSecret: config.passport.google.secret,
        callbackURL: "/user/auth/google/redirect"
    }
};

module.exports = {
    initialize: () => {
        //PassportJs JWT strategy for normal registration and login 
        passportService.use(new JwtStrategy(opts.jwt, function(jwt_payload, done) {
                User.findOne({
                    where: {
                        usrID: jwt_payload
                    }
                })
                    .then(u => {
                        if(u) done(null, u);
                        else done(null, false);
                    })
                    .catch(e => done(e, false));
        }));
        //PassportJs Google OAuth2.0 Strategy for login/Registration
        // passportService.use(new GoogleStrategy(opts.google, function(accessToken, refreshToken, profile, done) {
        //     User.findOrCreate(
        //         {
        //             where: {
        //                 email: profile.emails[0].value
        //             },
        //             defaults: {
        //                 email: profile.emails[0].value,
        //                 username: profile.displayName
        //             }
        //         }
        //     )
        //         .then((user) => {
        //             return done(null, user);
        //         })
        //         .catch(e => {
        //             return done(e, false);
        //         })
        // }));

    },
    pass: () => {return passportService}
};
