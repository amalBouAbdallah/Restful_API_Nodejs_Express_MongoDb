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

// get single user
function getSingleUser(req, res) {
  const id = req.params.userId;
  User.findById(id)
    .then((singleUser) => {
      res.status(200).json({
        success: true,
        message: `More on ${singleUser.Email}`,
        User: singleUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This user does not exist",
        error: err.message,
      });
    });
}
// update user
function updateUser(req, res) {
  const id = req.params.userId;
  const updateObject = req.body;
  User.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: "User is updated",
        updateUser: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
      });
    });
}
// delete a cause
function deleteUser(req, res) {
  const id = req.params.userId;
  User.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
}

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
