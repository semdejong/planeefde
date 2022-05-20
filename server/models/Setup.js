const mongoose = require("mongoose");
const crypto = require("crypto");

const setupSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  setupToken: {
    type: String,
    required: true,
    default: crypto.randomBytes(50).toString("hex"),
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Setup || mongoose.model("Setup", setupSchema);
