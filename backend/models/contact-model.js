const mongoose = require("mongoose");

//* ---------------
//* Define a Contact schema
//* ---------------

const contactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

//* ---------------------------------------
//* Create a Contact model using the schema
//* ---------------------------------------

const Contact = new mongoose.model("Contact", contactSchema);
module.exports = Contact;
