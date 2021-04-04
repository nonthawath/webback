var express = require('express');
var router = express.Router();
var Users = require('../models/Users')
var passport = require('passport')
const Session = require('../models/Session')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//       done(null, user)
//   });
//     passport.use(new GoogleStrategy({
//         clientID: '929076668714-b7feubj0vc390btqe3jo6pfultg8bk5k.apps.googleusercontent.com',
//         clientSecret: 'OI6jAQMzWOyILngboxfw_teM',
//         callbackURL: "http://localhost:3000/users/"
//       },
//       function(accessToken, refreshToken, profile, done) {
//           return done(null, profile);
//       }
// ));
/* GET users listing. */
router.post('/create', async (req, res, next) => {
  try {
    var user = new Users({
      username : req.body.username,
      email : req.body.email,
      password : req.body.password,
      name : req.body.name,
      lastname : req.body.lastname,
      phonenumber : req.body.phonenumber
    })
    await user.save()
    res.status(200).send('Create success');
  } catch (error) {
    console.log(error)
    next(error)
  } 
});

router.get('/', async (req, res, next) => {
  try {
    passport.authenticate('google', { scope: ['profile' , 'email'] })
    // passport.authenticate('google', { failureRedirect: '/login' })
      // Successful authentication, redirect home.
  } catch (error) {
    console.log(error)
    next(error)
  } 
});

router.post('/checktoken', async (req, res, next) => {
  try {
    let result = await Session.find({ token : req.body.token })
    // console.log(req.body.token)
    console.log(result)
    if(result.length > 0){
      res.send({ login : true , email : result[0].email , role: result[0].role })
    }else{
      res.send({ login : false , email : ''})
    }
  } catch (error) {
    console.log(error)
    next(error)
  } 
});

router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }) ,async (req, res) => {
  console.log('Login One => ' , req.user)
  res.redirect('http://localhost:8080/GetSubject?token=' + req.user)
  
}); 

module.exports = router;
