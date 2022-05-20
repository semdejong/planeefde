const express = require("express");

const { authenticate } = require("./middleware/authenticate");
const { authorize } = require("./middleware/authorize");

const Permission = require("../models/permission");
const PermissionUser = require("../models/Bmodels/permissionUser");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize("admin", "appname.permissions.GetAllRoles"),
  async function (req, res) {
    try {
      if (!req.authorized)
        return res.status(403).json({ message: "You are not authorized!" });

      const allPermissions = await Permission.find();
      return res.status(200).json(allPermissions);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/create",
  authenticate,
  authorize("admin", "appname.permissions.CreateRole"),
  async function (req, res) {
    try {
      if (!req.authorized)
        return res.status(403).json({ message: "You are not authorized!" });

      const permissionExists = await Permission.findOne({
        uniqueName: req.body.uniqueName,
      });
      if (permissionExists)
        return res.status(403).json({ message: "Permission already exists!" });

      const savedPermission = await new Permission({
        name: req.body.name,
        uniqueName: req.body.uniqueName,
      }).save();

      return res.status(200).json({ savedPermission });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);

router.post(
  "/assign",
  authenticate,
  authorize("admin", "appname.permissions.AssignRole"),
  async function (req, res) {
    try {
      if (!req.authorized)
        return res.status(403).json({ message: "You are not authorized!" });

      const relationExists = await PermissionUser.findOne({
        user: req.body.user,
        permissions: req.body.permission,
      });
      if (relationExists)
        return res.status(400).json({
          message: "This permission is already assigned to the user.",
        });

      const savedPermissionUser = await new PermissionUser({
        user: req.body.user,
        permissions: req.body.permission,
      }).save();

      return res.status(200).json({ savedPermissionUser });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
);
