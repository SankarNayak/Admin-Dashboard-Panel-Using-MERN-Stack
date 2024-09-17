// *-----------
// *Controllers
// *-----------

// ?In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const User = require("../models/user-model");

// *---------------
// *Home Page Logic
// *---------------

const home = async (req, res) => {
  try {
    res.status(200).send("Hello home page from the router side!");
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

// *-------------------
// *Register Page Logic
// *-------------------

const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    console.log(req.body);

    if (!username || !email || !phone || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    res.status(201).json({ message: userCreated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// *----------------
// *Login Page Logic
// *----------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login succesfull",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal sever error");
  }
};

//* ----------
//* User Logic
//* ----------

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = { home, register, login, user };
