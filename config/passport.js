const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const secret = require("./config").appSecret;
const User = require("../models/user");

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      {
        secretOrKey: secret,
        jwtFromRequest: (req) => req.cookies.jwt,
      },
      async (payload, done) => {
        const user = await User.findById(payload.id);
        if (!user) {
          done(null, false);
        } else {
          done(null, user);
        }
      }
    )
  );
};
