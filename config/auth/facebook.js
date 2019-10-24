const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../../models/user");
const _ = require("lodash");

passport.use(
  "facebookToken",
  new FacebookTokenStrategy(
    {
      clientID: process.env.facebookClientId,
      clientSecret: process.env.facebookClientSecret,
      passReqToCallback: true
    },
    async function(req, accessToken, refreshToken, profile, done) {
      console.log("FACEBOOK OAUTH CALLED");
      const providerID = profile.id;
      const email = profile.emails[0].value;
      const name = profile.displayName;

      // Search if user is already signed up
      let user = await User.findOne({
        email
      }).exec();
      // Register if not signed up
      if (_.isEmpty(user)) {
        // console.log(`Registering Facebook user to db`);
        user = new User({
          name,
          email,
          "facebook.id": providerID,
          "facebook.name": name,
          isRegistered: true
        });
        user = await user.save();
        return done(null, user);
      }
      // pass user to req object
      return done(null, user);
    }
  )
);
