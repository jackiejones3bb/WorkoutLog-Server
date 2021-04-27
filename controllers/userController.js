const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  res.send("Testing the user controller");
});

// CREATE NEW USER
router.post("/register", (req, res) => {
  User.create({
    username: req.body.username,
    passwordhash: bcrypt.hashSync(req.body.passwordhash, 10),
  })
    .then((user) => {
      let token = jwt.sign({ id: user.id }, "I_AM_SECRET", { expiresIn: "1d" });
      res.send({ user, token });
    })
    .catch((error) =>
      res
        .status(500)
        .send({ message: "User not created", error: error.errors[0].message })
    );
});

// LOGIN
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      bcrypt.compare(
        req.body.passwordhash,
        user.passwordhash,
        function (err, matches) {
          matches ? generateToken(user) : res.send("Incorrect Password");
        }
      );
      function generateToken(user) {
        let token = jwt.sign({ id: user.id }, "I_AM_SECRET", {
          expiresIn: "1d",
        });
        res.send({ user, token });
      }
    } else {
      res.send("No user found in database");
    }
  });
});

module.exports = router;
