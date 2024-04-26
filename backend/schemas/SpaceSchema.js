const mongoose = require('mongoose');

const ParkingSpaceSchema = new mongoose.Schema({
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,   // GeoJSON Point type
    },
    coordinates: [
      { type: Number, required: true }, // for Longitude
      { type: Number, required: true }  // for Latitude
    ]
  },
  hourly_rate: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  },
  image: {
    type: String,
    default: "https://parkez.vercel.app/assets/Park1-B8zUMOCE.jpg" 
  }
});

ParkingSpaceSchema.index({ location: "2dsphere" });

const Spaces = mongoose.model('spaces', ParkingSpaceSchema);

module.exports = Spaces;