const express = require("express");
const connectDB = require("./config/connectDB");
const User = require("./model/User");
require("dotenv").config({ path: "./config/.env" });

var app = express();
// establish a database connection
connectDB();

// Middleware parsing into json
app.use(express.json());
//CRUD
// Create users: POST
app.post("/addUsers", async (req, res) => {
  const { fullName, email, Phone, avatar } = req.body;
  try {
    const newUser = new User({
      fullName,
      email,
      Phone,
      avatar
    });
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error.message);
  }
});
// GET
app.get("/getUsers", async (req, res) => {
  try {
    // get all users
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.log(error.message);
  }
});
//Get a specific user
// app.get("/getUsers/:id", async (req, res) => {
//   const user = await User.findById(req.params.id);
//   res.send(user);
// });
// Update :PUT
app.put("/update/:id", async (req, res) => {
  try {
    const editedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(editedUser);
  } catch (error) {
    console.log(error);
  }
});
//Delete
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(`${deletedUser.name} deleted!`);
  } catch (error) {
    console.log(error.message);
  }
});

var PORT = process.env.PORT || 5000;

app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`Server is running on port ${PORT}`)
);
