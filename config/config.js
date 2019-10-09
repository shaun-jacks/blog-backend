module.exports = {
  http: { port: process.env.port },
  auth: {
    facebook: {
      clientId: process.env.facebookClientId,
      clientSecret: process.env.facebookClientSecret,
      callbackURL: process.env.facebookCallbackUrl
    },
    google: {
      clientId: process.env.googleClientId,
      clientSecret: process.env.googleClientSecret,
      callbackURL: process.env.googleCallbackUrl
    }
  },
  mongodb: {
    url: process.env.secret
  },
  token: {
    secret: process.env.secret,
    expiresIn: "1h"
  }
};
