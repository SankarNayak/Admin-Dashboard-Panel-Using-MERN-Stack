const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//! Why not to use the arrow functions when creating an instance methods in mongoose.
//? The key difference is that the function is defined as a regular function with the `function` keyword, not as an arrow function. This is important because when defining instance methods in Mongoose, we should use regular functions (not arrow functions) to ensure that `this` refers to the instance of the document being operated on.

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//* -------------------------------
//* Middleware for Password Hashing
//* -------------------------------
//? It runs before saving a user to the database. It checks if the password field is modified (changed) then it hashes the password field using bcrypt

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next(); // If password is not modified, move to next middleware
  }

  try {
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassword;
    next();
  } catch (err) {
    return next(err); // Pass any error to the next middleware
  }
});

//* --------------------
//* compare the password
//* --------------------

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

//* --------------
//* json web token
//* --------------

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d"
      }
    );
  } catch (err) {
    console.log("Token error", err);
  }
};

const User = new mongoose.model("user", userSchema);
module.exports = User;
