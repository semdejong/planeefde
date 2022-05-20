const express = require("express");
const router = express.Router();

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { User } = require("../models/user");

router.get("/", (req, res) => {
  const allRoles = ["Admin", "User"];
  return res.status(200).json(allRoles);
});

router.post(
  "/setRole",
  authenticate,
  authorize("admin", "appname.permissions.setRole"),
  (req, res) => {
    const { role } = req.body;
    const { _id } = req.user;
    User.findByIdAndUpdate(_id, { role }, { new: true })
      .then((user) => {
        return res.status(200).json(user);
      })
      .catch((err) => {
        return res.status(500).json(err.message);
      });
  }
);

module.exports = router;
