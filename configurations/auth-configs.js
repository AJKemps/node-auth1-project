const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);
const dbConnection = require("../database/connection");

const sessionConfiguration = {
  name: "monster",
  secret: "keep it secret, keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 10, // after 10 mins the cookie expires
    secure: process.env.COOKIE_SECURE || false, // if true cookie is only sent over https
    httpOnly: true, // JS cannot touch this cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR Compliance, the client should drive this
  store: new KnexSessionStore({
    knex: dbConnection,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60, // delete expired sessions every hour
  }),
};

module.exports = sessionConfiguration;
