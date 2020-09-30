var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
      done(null, user)
  });
    passport.use(new GoogleStrategy({
        clientID: '929076668714-b7feubj0vc390btqe3jo6pfultg8bk5k.apps.googleusercontent.com',
        clientSecret: 'OI6jAQMzWOyILngboxfw_teM',
        callbackURL: "http://localhost:3000/users/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          return done(null, profile);
      }
));