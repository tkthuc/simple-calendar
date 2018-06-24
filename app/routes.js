var path = require('path');

module.exports = function(app, passport) {
   

    app.get('/', function(req, res) {
        res.render('index.ejs');
    })


    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.sendFile(path.resolve('./webapp/dist/index.html'));
    });

    app.get('/webapp/dist/:filename', isLoggedIn, function(req, res) {
        res.sendFile(path.resolve(`./webapp/dist/${req.params.filename}`));
    });
  
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/styles/bootstrap/*', function(req, res) {
        let url = req.originalUrl.substring(req.originalUrl.indexOf('css'));
        res.sendFile(path.resolve(`./node_modules/bootstrap/dist/${url}`));
    })

    app.get('/styles/font-awesome/*', function(req, res) {
        let url;
        if(req.originalUrl.indexOf('fonts') > -1) {
            url = req.originalUrl.substring(req.originalUrl.indexOf('fonts'));
        } else {
            url = req.originalUrl.substring(req.originalUrl.indexOf('css')); 
        }
        if (url.indexOf('?') > -1) {
            url = url.substring(0,url.indexOf('?'));
        }
       
        res.sendFile(path.resolve(`./node_modules/font-awesome/${url}`));
    })



    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }))
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
