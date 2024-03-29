const Spaces = require('../schemas/SpaceSchema')

const createSpace = async (req, res) => {
  try {
   
    const { provider_id, address, location, hourly_rate , description , image , available } = req.body;
    if (!provider_id || !address || !location || !hourly_rate) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newSpace = new Spaces({
        provider_id,
        address,
        location,
        hourly_rate,
        description,
        image,
        available
      });

    // Save the space to the database
    const savedSpace = await newSpace.save();
    res.status(201).json({ message: 'Parking space created successfully', space: savedSpace });

  } catch (error) {
    console.error('Error in  creating space:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

module.exports = { getSpace , getAllSpaces , createSpace }