const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../models/user");
const _ = require("lodash");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      callbackURL: process.env.googleCallbackUrl,
      profileFields: ["id", "displayName", "email"]
    },
    async function(accessToken, refreshToken, profile, done) {
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
        console.log(`Registering Google user to db`);
        user = new User({
          name,
          email,
          "google.id": providerID,
          "google.name": name,
          isRegistered: true
        });
        user = await user.save();
        return done(null, user);
      }

      // Pass user to req object
      return done(null, user);
    }
  )
);
