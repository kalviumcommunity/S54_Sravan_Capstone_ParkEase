const Joi = require('joi');

const spaceSchema = Joi.object({
  provider_id: Joi.string().required().trim(), 
  address: Joi.string().required().trim(),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number().required()).min(2).max(2), // Array of 2 required numbers (longitude and  latitude)
  }).required(),
  hourly_rate: Joi.number().required().min(0.01).precision(2).max(1000), //  with 2 decimal places
  description: Joi.string().optional().trim().allow(""), // its Optional &  can be empty
  image: Joi.array().items(Joi.string().uri()).min(1).max(5),
  available: Joi.boolean().required(), 
});



const validateSpace = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).json({ message: 'Invalid request data', errors: error.details.map(err => err.message) });
    }
  
    next(); // Move on to the route handler if validation is successful
  };

module.exports = { validateSpace , spaceSchema};
