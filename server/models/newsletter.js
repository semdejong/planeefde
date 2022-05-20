const mongoose = require("mongoose");

const newsletterSchema = mongoose.Schema.extend({
  user: {
    type: String,
    min: 5,
    max: 100,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
