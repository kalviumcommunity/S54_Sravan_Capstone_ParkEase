const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: String, required: true },
  parkingSpace: { type: mongoose.Schema.Types.ObjectId, ref: "ParkingSpace", required: true },
  duration: { type: Number, required: true }, 
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
