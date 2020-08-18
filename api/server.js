const express = require("express");
const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");
const session = require("express-session");
const sessionConfiguration = require("../configurations/auth-configs");
const protectedRoute = require("../auth/protected-mw");

const server = express();

server.use(express.json());
server.use(session(sessionConfiguration));

server.use("/api/users", protectedRoute, userRouter);

server.use("/api", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "server running" });
});

module.exports = server;
