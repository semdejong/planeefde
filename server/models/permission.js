const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
  displayName: {
    type: String,
    min: 3,
    max: 255,
    required: true,
  },
  uniqueName: {
    type: String,
    min: 3,
    max: 255,
    unique: true,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Permission", permissionSchema);
