const SchoolContact = require("../models/Contact");

//create contact
//public
//api/contact
const CreateContact = async (req, res) => {
  const { name, email, phone, message } = req.body;
  
  try {
    const contact = await SchoolContact.create({ name, email, phone, message });
    if (contact) {
      res.status(201).json({ message: "Contact created" });
    }
  } catch (err) {
    res.status(400).json({ message: "Message Sending Failed" });
  }
};

//get all contacts
//public
//api/contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await SchoolContact.find({});
    res.json(contacts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

//delete contact
//public
//api/contact/:id
const DeleteContact = async (req, res) => {
  const { id } = req.params;
  // console.log(id);

  try {
    const contact = await SchoolContact.findById(id);
    // console.log(contact);
    if (contact) {
      await contact.deleteOne();
      res.status(200).json({ message: "Contact deleted" });
    }
  } catch (err) {
    res.status(400).json({ message: "Contact not deleted" });
  }
};
module.exports = { CreateContact, getContacts, DeleteContact };
