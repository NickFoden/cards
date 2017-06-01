const LocalStrategy   = require('passport-local').Strategy;
const {User} = require('./models.js');
const bcrypt = require('bcryptjs');


module.exports = function(passport){

  passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, email, password, done) { 
            User.findOne({ 'email' :  email }, 
                function(err, user) {
                    if (err)
                        return done(err);
                    if (!user){
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    if (!isValidPassword(user, password)){
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
                    }
                    return done(null, user);
                }
            );

        })
    );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}