const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model.js");

router.get("/", (req, res) => {
  res.status(200).json({ message: "auth router reached" });
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

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  const rounds = process.env.HASH_ROUNDS || 8;
  const hash = bcrypt.hashSync(password, rounds);

  Users.add({ username, password: hash })
    .then((user) => {
      res.status(201).json({ data: user });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username }).then((response) => {
    let user = response[0];

    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.loggdIn = true;

      res.status(200).json({
        hello: user.username,
        session: req.session,
      });
    } else {
      res.status(401).json({ error: "you shall not pass" });
    }
  });
});

module.exports = router;
