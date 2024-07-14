const cloudinary = require("../utils/clodinaryConfig");
const fs = require('fs');

const uploadFile = async (req, res, err) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log(req.files);
    const images = req.files;
    const imageUrls = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto"
      });
      imageUrls.push(result.secure_url);
    }

    req.images = imageUrls;
    console.log(imageUrls);
    res.json({ urls: imageUrls });
  } catch (error) {
    console.error("Error uploading files:", error);

    if (req.files) {
      req.files.forEach((file) => {
        try {
          fs.unlinkSync(file.path);
        } catch (err) {
          console.error("Error deleting file:", err);
        }
      });
    }

    res.status(500).send(`Internal Error at uploading the file - ${error.message}`);
  }
};

module.exports = { uploadFile };
