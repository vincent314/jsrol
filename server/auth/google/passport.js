var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (User, config) {
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                email: profile.email[0]
            }, function (err, user) {
                return done(err, user);
            });
        }
    ));
};
