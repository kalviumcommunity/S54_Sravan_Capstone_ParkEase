const cloudinary = require("../utils/clodinaryConfig");
const fs = require('fs')
const uploadFile = async (req, res, err) => {
  try {
     
    if(!req.files) {
      return res.status(400).json({message: 'No file uploaded'});
    }

      console.log(req.files)
    const images = req.files

    const imageUrls = []
    for (const image of images){
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto"
      });
      imageUrls.push(result.secure_url)
    }
    req.images = imageUrls
    console.log(imageUrls)
    res.json( {"urls" : imageUrls })

    } catch (error) {
      console.error(error);
      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
      res.status(500).send(`Internal Error at uploading the file - ${error}`);
    }
};

module.exports = { uploadFile };