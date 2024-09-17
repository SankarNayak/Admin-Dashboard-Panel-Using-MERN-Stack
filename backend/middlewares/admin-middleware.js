const adminMidddleware = async (req, res, next) => {
  try {
    console.log(req.user);
    const adminRole = req.user.isAdmin;

    if (!adminRole) {
      return res
        .status(403)
        .json({ message: "Access dednied. User is not and admin" });
    }

    //? If user is an admin then proceed to the next middleware
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = adminMidddleware;
