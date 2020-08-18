const router = require("express").Router();

const Users = require("./users-model.js");

router.get("/", (req, res) => {
  res.status(200).json({ message: "user router reached" });
});

router.get("/users", (req, res) => {
  Users.find({})
    .then((response) => {
      res.status(200).json({ data: response });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
