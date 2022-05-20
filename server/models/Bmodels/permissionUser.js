const mongoose = require("mongoose");

const permissionUserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PermissionUser", permissionUserSchema);
