const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/user");
const config = require("../config");
const _ = require("lodash");

passport.use(
  new FacebookStrategy(
    {
      clientID: config.auth.facebook.clientId,
      clientSecret: config.auth.facebook.clientSecret,
      callbackURL: config.auth.facebook.callbackURL,
      profileFields: ["id", "displayName", "email"]
    },
    async function(accessToken, refreshToken, profile, done) {
      console.log("FACEBOOK OAUTH CALLED");
      console.log(profile);
      const providerID = profile.id;
      const email = profile.emails[0].value;
      const name = profile.displayName;

      // Search if user is already signed up
      let user = await User.findOne({
        email
      }).exec();
      console.log(user);
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
        console.log(user);
        return done(null, user);
      }
      // pass user to req object
      return done(null, user);
    }
  )
);
