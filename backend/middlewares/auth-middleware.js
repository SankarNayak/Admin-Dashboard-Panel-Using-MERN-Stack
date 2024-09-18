const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

//* --------------------------------------
//* Middleware function for authentication
//* --------------------------------------

const authMiddleware = async (req, res, next) => {
  //? Extract JWT token from request header
  const token = req.header("authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: No token provided" });
  }

  //? Assuming token is in the format "Bearer <jwtToken>, Removing 'Bearer' from token string and trim excess spaces
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    //? Verify the JWT token usiing the secret key
    const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    //? Finding user data based on decodedToken's email (excluding password)
    const userData = await User.findOne({ email: decodedToken.email }).select({
      password: 0,
    });

    //? Attach token, user data, and user ID to the request object
    req.token = token;
    req.user = userData;
    req.userID = userData._id;

    //? Proceed to the next middleware or route handle
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Invalid token" });
  }
};

module.exports = authMiddleware;
