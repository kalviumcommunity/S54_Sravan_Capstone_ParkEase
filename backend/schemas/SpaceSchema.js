const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true }
  },
  availability: { type: String, enum: ['available', 'occupied'], default: 'available' },
  capacity: { type: Number, required: true },
  price: {
    hourly: { type: Number, required: true },
    daily: { type: Number, required: true },
    monthly: { type: Number, required: true }
  },
  features: [{ type: String }],
  owner: {
    name: { type: String, required: true },
    contact: { type: String, required: true }
  },
  image : [{ type: String }],
  rating: { type: Number, default: 0 },
  reviews: [{
    user: { type: String },
    rating: { type: Number },
    comment: { type: String }
  }]
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;