const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const mailer = require("../mailer/mailer");
const sender = process.env.YOUR_MAIL;

//* -----------------
//* getAllUsers Logic
//* -----------------

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

//* --------------
//* user get Logic
//* --------------

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//* -----------------
//* user update Logic
//* -----------------

const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      {
        $set: updatedUserData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

//* -----------------
//* user delete Logic
//* -----------------

const deleteUsersById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//* --------------------
//* contact delete Logic
//* --------------------

const deleteContactsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//* ----------------
//* Reply User Logic
//* ----------------

const getContactsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Contact.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const replyContactsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { email, reply } = req.body;

    const userExist = await Contact.findOne({ _id: id }, { password: 0 });
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "No account with that email address exists." });
    }

    const mailOptions = {
      from: sender,
      to: email,
      subject: "Reply For Your Query",
      text: reply,
    };

    mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ message: "Error sending email" });
      } else {
        res.status(200).json({
          message:
            "An email has been sent to " +
            email +
            " with further instructions.",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

//* --------------------
//* getAllContacts Logic
//* --------------------

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts found" });
    }
    res.status(200).json(contacts);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUsersById,
  getUserById,
  updateUserById,
  deleteContactsById,
  getContactsById,
  replyContactsById,
};
