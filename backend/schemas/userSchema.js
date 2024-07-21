const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  clerkUserId: { type: String, required: true, unique: true },
  mybookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
  myspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpace" }]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
