// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require("../Models/models.js")
//require('.../server/Models/models.js');


// expose this function to our app using module.exports
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we can override it with any other variable
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        User.findOne({ username :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err) {
                console.log('error encountered ********************');
                return done(err);
            }

            // check to see if theres already a user with that username
            if (user) {
                console.log('user alreay Found');
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            }
            else {

                // if there is no user with that username create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                //newUser.name = req.

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    console.log('newUser', newUser);
                    return done(null, newUser);
                });
            }

        });    

        });

    }));

     passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we can override with email
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
        console.log('username , password',username , password , done)
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ username :  username }, function(err, user) {
            console.log('user details are ', user);
            // if there are any errors, return the error before anything else
            if (err){
                console.log('error encountered /////////////////////////////');
                return done(err);
            }

            // if no user is found, return the message
            if (!user){
                console.log('User not found /////////////////////////////');
                //console.log('this is the flash message',req.flash('signUpMessage', 'That email is already taken.'));
                return done(null, false, {"info" : "That email is already taken"});
                /*, req.flash('info', 'That email is already taken.')*/ // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                console.log('Invalid password /////////////////////////////');
                return done(null, false); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            console.log('chekcing if this prints');
            return done(null, user);
        });

    }));

};



/*
, req.flash('signupMessage', 'That email is already taken.'));
            } else {*/