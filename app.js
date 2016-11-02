var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var auth = require('./auth');
var FacebookStrategy = require('passport-facebook').Strategy;


app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/fail', function (req, res) {
  res.send('fail');
});

app.get('/success', function (req, res) {
  res.send('chillern');
});

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/fail' }),
  function(req, res) {

    var user = req.user._json;

    res.send(user);
  });

passport.use(new FacebookStrategy({
    clientID: auth.facebookAuth.clientID,
    clientSecret: auth.facebookAuth.clientSecret,
    callbackURL: auth.facebookAuth.callbackURL,
    profileFields: auth.facebookAuth.profileFields
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null,profile)
  }
));



app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});
