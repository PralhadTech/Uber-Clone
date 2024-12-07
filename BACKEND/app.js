const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoute");

//datatbase connection
const connectToDB = require("./db/db");
connectToDB();

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/users", userRoutes);

module.exports = app;
