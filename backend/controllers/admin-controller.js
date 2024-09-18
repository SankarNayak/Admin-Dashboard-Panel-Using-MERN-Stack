const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");
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

//* -----------------
//* getUserById Logic
//* -----------------

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//* --------------------
//* updateUserById Logic
//* --------------------

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

//* ---------------------
//* deleteUsersById Logic
//* ---------------------

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

//* ---------------------
//* getContactsById Logic
//* ---------------------

const getContactsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Contact.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

//* ------------------------
//* deleteContactsById Logic
//* ------------------------

const deleteContactsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

//* -----------------------
//* replyContactsById Logic
//* -----------------------

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
//* getAllServices Logic
//* --------------------

const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No Services found" });
    }
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//* --------------------
//* getServiceById Logic
//* --------------------

const getServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const serviceData = await Service.findOne({ _id: id });
    return res.status(200).json(serviceData);
  } catch (error) {
    next(error);
  }
};

//* -----------------------
//* updateServiceById Logic
//* -----------------------

const updateServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedServiceData = req.body;

    const updatedData = await Service.updateOne(
      { _id: id },
      {
        $set: updatedServiceData,
      }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

//* ---------------------
//* deleteUsersById Logic
//* ---------------------

const deleteServiceById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Service.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUsersById,
  getAllContacts,
  getContactsById,
  deleteContactsById,
  replyContactsById,
  getAllServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
};
