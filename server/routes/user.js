const express = require("express");

const router = express.Router();

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");
const { User } = require("../models/user");
const Setup = require("../models/Setup");
const { paginatedResults } = require("./middleware/paginate");
router.get(
  "/",
  authenticate,
  paginatedResults(User),
  authorize("admin", "appname.permissions.GetAllUsers"),
  async (req, res) => {
    const users = res.paginatedResults.results;
    if (!req.authorized) {
      const usersToReturn = users.map((user) => {
        return {
          id: user._id,
          username: user.username,
        };
      });
      return res.status(200).json({
        nextPage: res.paginatedResults.next,
        previousPage: res.paginatedResults.previous,
        users: usersToReturn,
      });
    }
    res.status(200).json({
      amount: res.paginatedResults.amount,
      nextPage: res.paginatedResults.next,
      previousPage: res.paginatedResults.previous,
      users: await Promise.all(
        users.map(async (user) => {
          const isSetup = await getUserSetup(user);
          return { ...user._doc, password: "", isActive: !isSetup };
        })
      ),
    });
  }
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "appname.permissions.GetUser"),
  async (req, res) => {
    try {
      console.log(req.params);
      if (req.params.id === "0" || req.params.id === req.user._id) {
        return res.status(200).json({
          message: "Succesfully got user",
          username: req.user.username,
          fullname: req.user.fullname,
          email: req.user.email,
          role: req.user.role,
        });
      }
      1;

      if (!req.authorize)
        return res.status(403).json({
          message:
            "You do not have permission to access this users information",
        });

      const user = await User.findOne({ _id: req.params.id });

      if (!user)
        return res.status(400).json({ message: "This user does not exist" });

      return res.status(200).json({
        message: "Succesfully got user",
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin", "appname.permissions.ChangeUser"),
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (user._id === req.user._id || req.authorized) {
        if (!user) return res.status(400).json({ message: "User not found" });
        if (req.body.username) user.username = req.body.username;
        if (req.body.fullname) user.fullname = req.body.fullname;
        if (req.body.email) user.email = req.body.email;
        await user.save();
        user.password = "";
        return res.status(200).json(user);
      } else {
        return res
          .status(403)
          .json({ message: "You do not have permission to change this user" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

async function getUserSetup(user) {
  const isSetup = await Setup.findOne({ user: user._id });
  return isSetup;
}

module.exports = router;
