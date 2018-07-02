let LocalStrategy = require('passport-local').Strategy;

let User =  require('../app/models/user');



module.exports = function(passport){
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done){
            
                User.findOne({ 'local.username' : username }, (err, user) => {
                    if (err) {
                        return done (err);
                    }

                    if (user) {
                        return done(null, false, { message: 'Username is already taken'});
                    } else {
                        let newUser = new User();

                        newUser.local.username = username;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(err => {
                            if (err) {
                                throw er;
                            }
                            return done(null, newUser);
                        })
                    }
                })
            
        })
    );
    
    passport.use('local-login', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req,username,password,done) => {
            User.findOne({'local.username' : username}, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found'));
                }

                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }

                return done(null, user);
            })
        }
    ))
}