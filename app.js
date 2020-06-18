const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("./config/config.js");
const routes = require("./routes/index");
const passport = require("passport");
const { join } = require("path");
const cors = require("cors");

require("./config/passport")(passport);

// Connect to the database
const mongoDB = config.mongoURI;
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB...");
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors());

// Everything in the back-end needs to be prefixed with /api/
app.use("/api/", routes);

app.use(express.static(join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
