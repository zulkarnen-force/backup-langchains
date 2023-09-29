import passport from 'passport';
import {Strategy as LocalStrategy } from 'passport-local'
import UserModel from 'api/models/User.js';
import passwordUtils from 'utils/password.js';


passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          
            const user: any = UserModel.findOne({email});
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          let validate = passwordUtils.comparePasswords(password, user.password)
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
