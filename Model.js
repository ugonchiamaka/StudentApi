const mongoose = require("mongoose");

const model = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    phoneNo: {
      type: Number,
    },

    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentsData", model);
