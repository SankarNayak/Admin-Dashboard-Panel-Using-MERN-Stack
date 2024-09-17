// *--------------
// *express.Router
// *--------------
// ?In Express.js, express.Router() is a mini Express application without all the server configuration but with thee ability to define routes, middleware, and even have its own set of route handlebars. It allows you to modularize your routes and middleware to keep your code organized and maintainable.

// *htps://expressjs.com/en/guide/routing.html
// ?Use the express.Router class to create modular. mountable route handlebars. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-map".

const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller");
const validate = require("../middlewares/validate-middleware");
const { loginSchema, signupSchema } = require("../validators/auth-validator");
const authMiddleware = require("../middlewares/auth-middleware");

//* --------------------------
//! router.route vs router.get
//* --------------------------

//* router.get: This method is used to handle HTTP GET requests on a specific route
/*
?router.get('/users', (req, res) => {});
?router.post('/users', (req, res) => {});
*/
//* router.route: This method allow us to define multiple routes for a specific HTTP method on a single route path. It is particularly useful when we want to define multiple HTTP methods (GET, POST, PUT, DELETE, etc.) on the same route
/*
?router.route('/users')
?  .get((req, res) => {})
?  .post((req, res) => {});
*/

/*
?const home = (req, res) => {
?    res.status(200).send("Hi this is auth home page");
?};
?router.route('/').get(home);
*/
router.route("/").get(authControllers.home);
router
  .route("/register")
  .post(validate(signupSchema), authControllers.register);
router.route("/login").post(validate(loginSchema), authControllers.login);
router.route("/user").get(authMiddleware, authControllers.user);

module.exports = router;
