var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('client-sessions');

var routes = require('./routes/index');
var users = require('./routes/users');
var signup=require('./routes/signup');
var login=require('./routes/login');
var tweets=require('./routes/tweets');
var search=require('./routes/search');
var follow=require('./routes/follow');
var profile=require('./routes/profile');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({

    cookieName: 'session',
    secret: 'cmpe273_test_string',
    duration: 30 * 60 * 1000,    //setting the time for active session
    activeDuration: 5 * 60 * 1000,  }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.post('/signup',signup.createUser);
app.post('/login',login.login);
app.get('/test',function(req,res){console.log()});
app.get('/userMainPage',login.redirectToUserMainPage);
app.post('/insertTweet',tweets.insertTweet);
app.post('/insertRetweet',tweets.insertRetweet);
app.post('/searchUser',search.searchUser);
app.post('/followUser',search.followUser);
app.get('/getFollowingUsers',follow.getFollowingUsers);
app.get('/getFollowersUsers',follow.getFollowersUsers);
app.get('/getTweets',tweets.getTweets);
app.post('/searchHashTags',search.searchHashTags);
app.get('/logout',login.logout);
app.get('/getStats',tweets.getStats);
app.post('/updateProfile',profile.updateProfile);
app.get('/getProfile',profile.getProfile);
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
