const Spaces = require('../schemas/SpaceSchema')

const getSpace = async (req, res) => {
    const { id } = req.params

    try {
        const space = await Spaces.findOne({ _id: id });

        if (!space) {
            return res.status(404).json({ message: 'Space Not Found' });
        }
        res.status(200).json(space);
    } catch (err) {
        console.error(err);
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

module.exports = { getSpace , getAllSpaces }