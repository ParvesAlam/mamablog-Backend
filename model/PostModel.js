const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Post", postSchema);