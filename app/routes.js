var path = require('path');

module.exports = function(app, passport) {
   

    // app.get('/', function(req, res) {       
    //     res.sendFile(path.resolve('./webapp/dist/index.html'));
    // })

    app.get('/webapp/dist/:filename', function(req,res) {
        res.sendFile(path.resolve(`./webapp/dist/${req.params.filename}`));
    }); 

    app.get('/profile/:username', isLoggedIn , function(req, res) {
    
        res.sendFile(path.resolve('./webapp/dist/profile.html'));
      
    });

    app.get('/webapp/dist/login/:filename', function(req,res) {
        res.sendFile(path.resolve(`./webapp/dist/login/${req.params.filename}`));
    });

    app.get('/webapp/dist/assets/:filename', function(req,res) {
        res.sendFile(path.resolve(`./webapp/dist/assets/${req.params.filename}`));
    });

    app.get('/webapp/dist/vendor/:filename', function(req,res) {
        res.sendFile(path.resolve(`./webapp/dist/vendor/${req.params.filename}`));
    });

    app.get('/webapp/dist/:module/:filename', isLoggedIn, function(req, res) {        
        res.sendFile(path.resolve(`./webapp/dist/${req.params.module}/${req.params.filename}`));
    });
  
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {
          if (err) { 
              return next(err); 
          }
          if (!user) { 
              return res.status(401).json({message: info.message}); 
          }    
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).json({success: true}); 
          });    
        })(req, res, next);
    });



    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
          if (err) { 
              return next(err); 
          }
          if (!user) { 
              return res.status(401).json({message: "Wrong Username"}); 
          }
          req.logIn(user, function(err) {
              if(err) {
                return res.status(401).json({message: "Wrong Password"});             
              } else {           
                res.status(200).json({success: true});               
              }
          });
        })(req, res, next);
    });
    

    app.use(function(req, res){
        res.sendFile(path.resolve('./webapp/dist/index.html'));
    });
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
