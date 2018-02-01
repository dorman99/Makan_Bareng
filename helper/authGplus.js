const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: '295462696298-r3hnmjesql8s73kajj9nj08293qpbvlo.apps.googleusercontent.com',
        clientSecret: '3G-rF9qVKAEoGk1SZrwTDv-k',
        callbackURL: 'http://localhost:3000/signingoogle/callback'
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};