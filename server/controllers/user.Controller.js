const mongoose = require("mongoose");
const User = require("../models/user.Model");
// create new user
function createUser(req, res) {
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    FullName: req.body.FullName,
    Email: req.body.Email,
  });
  return user
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: "New user created successfully",
        User: newUser,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get all users
function getAllUsers(req, res) {
  User.find()
    .select("_id FullName Email")
    .then((allUsers) => {
      return res.status(200).json({
        success: true,
        message: "A list of all users",
        User: allUsers,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// Find a single user with a userId
function getSingleUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId,
      });
    });
}
// Update a user identified by the userId in the request
function updateUser(req, res) {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Find user and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      FullName: req.body.FullName,
      Email: req.body.Email,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
}

// Delete a user with the specified userId in the request
function deleteUser(req, res) {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
}

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
