const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 256,
    },
    description: {
      type: String,
      min: 3,
      max: 1024,
    },
    customStyle: new mongoose.Schema({}, { strict: false }),
    pages: {
      type: Number,
      min: 1,
      max: 10,
    },
    customContent: new mongoose.Schema({}, { strict: false }),
    customFields: [
      new mongoose.Schema(
        {
          name: {
            type: String,
            required: true,
            min: 3,
            max: 256,
          },
          type: {
            type: String,
            required: true,
            min: 3,
            max: 256,
          },
          required: {
            type: Boolean,
            required: true,
          },
          page: {
            type: Number,
            required: true,
            max: 10,
            min: 1,
          },
          row: {
            type: Number,
            required: true,
            max: 10,
            min: 1,
          },
          column: {
            type: Number,
            required: true,
            max: 10,
            min: 1,
          },
          formItemStyle: {
            type: Object,
          },
          inputStyle: {
            type: Object,
          },
          labelStyle: {
            type: Object,
          },
          dateCreated: {
            type: Date,
            default: Date.now,
          },
        },
        { strict: false }
      ),
    ],
    recommended: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  },
  { strict: false }
);

module.exports = mongoose.model("Project", projectSchema);
