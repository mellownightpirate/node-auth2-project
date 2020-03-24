const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const {
  validateRequestFullBody,
  validateUsername
} = require("../middleware/user-middleware");

function makeToken(user, status) {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1d",
    audience: status
  };
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET || "Secret",
    options
  );
  return token;
}

router.post("/register", validateRequestFullBody, (req, res) => {
  const { username, password, department } = req.body;

  const bcryptHash = bcrypt.hashSync(password, 12);
  const user = {
    username,
    password: bcryptHash,
    department
  };

  Users.register(user)
    .then(id => {
      res.status(201).json(`New user id: ${id}`);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", validateUsername, (req, res) => {
  const { username, password } = req.body;
  Users.login({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        if (user.username === "admin") {
          const token = makeToken(user, "1");
          res.status(200).json({ message: `Welcome back!`, token });
        } else {
          const token = makeToken(user, "2");
          res.status(200).json({ message: `Welcome back ${user.username}`, token });
        }
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
