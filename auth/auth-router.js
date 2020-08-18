const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

router.get("/", (req, res) => {
  res.status(200).json({ message: "auth router reached" });
});

module.exports = router;
