const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  userRole: {
    type: String,
    required: true,
    default: "user",
  },
});

const User = mongoose.model("deepikauser", userSchema);

module.exports = User;
