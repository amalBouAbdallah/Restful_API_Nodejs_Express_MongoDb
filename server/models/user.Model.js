const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  FullName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = User = mongoose.model("User", UserSchema);
