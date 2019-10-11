const passport = require("passport");
const GoogleTokenStrategy = require("passport-token-google").Strategy;
const User = require("../../models/user");
const _ = require("lodash");

passport.use(
  "google-token",
  new GoogleTokenStrategy(
    {
      clientID: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      passReqToCallback: true
    },
    async function(req, accessToken, refreshToken, profile, done) {
      console.log("HERE");
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
