const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  mybookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  myspaces: [{
    type: Schema.Types.ObjectId,
    ref: 'ParkingSpace'
  }]

});

module.exports = mongoose.model('User', userSchema);
