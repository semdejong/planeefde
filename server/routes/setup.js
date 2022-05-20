const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const Setup = require("../models/Setup");
const { User } = require("../models/user");

router.get("/:id", async (req, res) => {
  try {
    const setupToken = await Setup.findOne({ setupToken: req.params.id });
    if (!setupToken)
      return res
        .status(404)
        .send({ message: "This setup token does not exists" });

    const user = await User.findOne({ _id: setupToken.user });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const setupToken = await Setup.findOne({ verifyToken: req.params.id });
    if (!setupToken)
      return res
        .status(404)
        .send({ message: "This setup token does not exists" });

    const user = await User.findOne({ _id: setupToken.user });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;

    await Setup.findOneAndDelete({ _id: setupToken._id });

    await user.save();

    return res.status(200).send({ message: "User setup completed" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
