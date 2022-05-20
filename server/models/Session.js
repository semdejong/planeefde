const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
    max: 1000,
  },
  sessionToken: {
    type: String,
    required: true,
    max: 1000,
  },
  session2FA: {
    // This will be used for 2FA
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    // This will automatically expire the session after a year.
    type: Date,
    default: Date.now,
    index: { expires: "8640000000" },
  },
});

module.exports =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
