const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMidddleware = require("../middlewares/admin-middleware");

router
  .route("/users")
  .get(authMiddleware, adminMidddleware, adminControllers.getAllUsers);

router
  .route("/users/:id")
  .get(authMiddleware, adminMidddleware, adminControllers.getUserById);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMidddleware, adminControllers.deleteUsersById);

router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMidddleware, adminControllers.updateUserById);

router
  .route("/contacts/delete/:id")
  .delete(
    authMiddleware,
    adminMidddleware,
    adminControllers.deleteContactsById
  );

router
  .route("/contacts/reply/:id")
  .post(authMiddleware, adminMidddleware, adminControllers.replyContactsById);

router
  .route("/contacts")
  .get(authMiddleware, adminMidddleware, adminControllers.getAllContacts);

router
  .route("/contacts/:id")
  .get(authMiddleware, adminMidddleware, adminControllers.getContactsById);

module.exports = router;
