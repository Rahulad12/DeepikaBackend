const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    required: [true, "Please provide a image"],
  },
  shownotice: {
    type: Boolean,
    default: false,
  },
});

const SchoolNotice = mongoose.model("Schoolnotice", NoticeSchema);

module.exports = SchoolNotice;
