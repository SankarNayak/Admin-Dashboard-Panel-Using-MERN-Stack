//! This line should be at the top of our code
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT;
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/database");
const errorMiddleware = require("./middlewares/error-middleware");

//* let tackle cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

//* Here, we are mounting routers at a specific paths like (/api/auth), (/api/form) & (/api/data)
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

//* lets's define admin route
app.use("/api/admin", adminRoute)

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Hello home page from the server side!");
});

app.get("/register", (req, res) => {
  res.status(200).send("Hello register page from the server side!");
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
