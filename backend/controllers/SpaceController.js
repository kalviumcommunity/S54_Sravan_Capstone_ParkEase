const Spaces = require('../schemas/SpaceSchema');

const ParkingSpace = require('../schemas/SpaceSchema');

const createSpace = async (req, res) => {
  try {
    const { location, availability, capacity, price, features, owner, rating, reviews, images } = req.body;

    // Validate required fields
    if (!location  || !price || !owner || !images || images.length === 0) {
      console.log(location, price, owner, images)
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
    res.status(201).json({ message: 'Parking space created successfully', space: savedSpace });

  } catch (error) {
    console.error('Error creating space:', error);
    res.status(500).json({ message: 'Failed to create parking space', error: error.message });
  }
};



const getSpace = async (req, res) => {
    const { id } = req.params

    try {
        const space = await Spaces.findOne({ _id: id });

        if (!space) {
            return res.status(404).json({ message: 'Space Not Found' });
        }
        res.status(200).json(space);
    } catch (err) {
        console.error('Error getting space:', err.message);
        res.status(500).json({ err: 'Internal Server Error' });
    }
}


const getAllSpaces = async (req, res) => {
    try {
        const allSpaces = await Spaces.find();

        res.status(200).json(allSpaces);
    } catch (error) {
        console.error('Error getting spaces:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSpace = async (req , res) => {
    const  { id } = req.params
    const updates = req.body;
    if (!id) {
        return res.status(400).json({ message: 'Missing space ID' });
    }

    try {

        const space = await Spaces.findByIdAndUpdate(id, updates, { new: true }); // setting new: true to return the updated document
    
        if (!space) {
          return res.status(404).json({ message: 'Space Not Found' });
        }
    
        res.status(200).json({ message: 'Space updated successfully', space });
      }
   catch (error) {
        console.error('Error updating space:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { getSpace , getAllSpaces , createSpace , updateSpace }