const User = require("../models/user-model");
const Contact = require("../models/contact-model");

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

//* --------------------
//* getAllContacts Logic
//* --------------------

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    console.log(contacts);
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
};
