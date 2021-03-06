const express = require('express')
  , passport = require('passport')
  , cookieParser = require('cookie-parser')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , config = require('./configuration/config')
  , app = express();

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;


passport.use(new GoogleStrategy({
  clientID: config.google.api_key,
  clientSecret: config.google.api_secret,
  callbackURL: config.google.callback_url
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
  clientID: config.facebook.api_key,
  clientSecret: config.facebook.api_secret,
  callbackURL: config.facebook.callback_url
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

//app.use(express.static(__dirname + '/public'));

// Define routes.
app.get('/', function (req, res) {
  res.render('index', { user: req.user });
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/')
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.listen(3000, () => console.log('Server up'));