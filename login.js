// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, email, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'email' :  email }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with email '+email);
          return done(null, false, 
                req.flash('message', 'Email Not found.'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(email, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));