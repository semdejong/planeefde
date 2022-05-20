const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: true,
    },
    IPAdress: {
      type: String,
    },
    pageCompleted: {
      type: Number,
      required: true,
      default: 0,
    },
    data: {
      type: Object,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("Lead", leadSchema);
