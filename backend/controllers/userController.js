const User = require('../schemas/userSchema');
const ParkingSpace = require('../schemas/SpaceSchema');
const Booking = require("../schemas/bookingSchema");

// Controller to create a new user only if doesn't exist
const createUser = async (req, res) => {
  try {
    const { email, clerkUserId } = req.body;
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    // If user doesn't exist, create a new user with Clerk user ID
    const newUser = await User.create({ email, clerkUserId });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};


// Controller to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getUserSpaces = async (req, res) => {
  try {
    const clerkUserId = req.params.clerkUserId;

    // Find the user by ID and populate the myspaces array
    const user = await User.findOne({ clerkUserId }).populate('myspaces');


    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.myspaces);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const createBooking = async (req, res) => {
  const { clerkUserId, parkingSpaceId, duration, amount, paymentId } = req.body;

  try {
    // Create a new booking
    const booking = new Booking({
      user: clerkUserId,  // Save clerkUserId directly
      parkingSpace: parkingSpaceId,
      duration,
      amount,
      paymentId
    });

    await booking.save();

    // Find the user by clerkUserId and update their bookings
    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's bookings
    user.mybookings.push(booking._id);
    await user.save();

    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Controller to delete user by email
const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const deletedUser = await User.findOneAndDelete({ email });
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = {
  createUser,
  createBooking,
  getUsers,
  getUserSpaces,
  deleteUserByEmail,
};
