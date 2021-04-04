var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const md5 = require('md5');
const Session = require('../models/Session')
const Users = require('../models/Users')

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
      async (accessToken, refreshToken, profile, done ) => {
        let email = profile.emails[0].value 
        let token = md5( Date.now() + email )
        
        // console.log(email);
        try {
          let user = await Users.findOne({ email : email })
          if(user == null){
            // console.log( ' new USer')
            user =  new Users({
              email : email,
            })
            await user.save()
          }
          let createsession = new Session({
            token : token,
            email : email,
            role : user.role
          })
          await createsession.save()
          // console.log('Create Session : ' , token)
          return done(null , token)
        } catch (error) {
          console.log(error)
        } 
      }
));