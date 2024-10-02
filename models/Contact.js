const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  phone: {
    type: String,
    required: [true, "Please provide a phone number"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
  },
});

const SchoolContact = mongoose.model("Schoolcontact", ContactSchema);

module.exports = SchoolContact;
