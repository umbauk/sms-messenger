const config = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/via-take-home",
  appSecret: process.env.APP_SECRET || "se3cre3t7",
  jwtTokenExpire: process.env.JWT_TOKEN_EXPIRE || 365,
  twilioSid: process.env.TWILIO_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNo: process.env.TWILIO_PHONE_NO || "+12013501163",
};

module.exports = config;
