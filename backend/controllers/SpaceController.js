const ParkingSpace = require('../schemas/SpaceSchema');
const User = require('../schemas/userSchema'); // Assuming the file is named UserSchema.js

const createSpace = async (req, res) => {
  try {
    const { location, availability, capacity, price, features, owner, rating, reviews, images, ownerId } = req.body;

    // Validate required fields
    if (!location || !price || !owner || !images || images.length === 0 || !ownerId) {
      console.log(location, price, owner, images);
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newSpace = new ParkingSpace({
      location,
      availability,
      capacity,
      price,
      features,
      owner,
      rating,
      reviews,
      images
    });

    // Save the space to the database
    const savedSpace = await newSpace.save();

    // Add the space to the user's list of spaces
    await User.findOneAndUpdate({ clerkUserId: ownerId }, { $push: { myspaces: savedSpace._id } });

    res.status(201).json({ message: 'Parking space created successfully', space: savedSpace });

  } catch (error) {
    console.error('Error creating space:', error);
    res.status(500).json({ message: 'Failed to create parking space', error: error.message });
  }
};

const getSpace = async (req, res) => {
  const { id } = req.params;

  try {
    const space = await ParkingSpace.findById(id).populate('owner');

    if (!space) {
      return res.status(404).json({ message: 'Space Not Found' });
    }
    res.status(200).json(space);
  } catch (err) {
    console.error('Error getting space:', err.message);
    res.status(500).json({ err: 'Internal Server Error' });
  }
};

const getAllSpaces = async (req, res) => {
  try {
    const allSpaces = await ParkingSpace.find().populate('owner');

    res.status(200).json(allSpaces);
  } catch (error) {
    console.error('Error getting spaces:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateSpace = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing space ID' });
  }

  try {
    const space = await ParkingSpace.findByIdAndUpdate(id, updates, { new: true });

    if (!space) {
      return res.status(404).json({ message: 'Space Not Found' });
    }

    res.status(200).json({ message: 'Space updated successfully', space });
  } catch (error) {
    console.error('Error updating space:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getSpace, getAllSpaces, createSpace, updateSpace };
