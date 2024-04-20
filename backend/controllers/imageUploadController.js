

const cloudinary = require("../utils/clodinaryConfig");
const fs = require('fs')
const uploadFile = async (req, res, err) => {
  try {
     
    if(!req.files) {
      return res.status(400).json({message: 'No file uploaded'});
    }

    
    // const images = req.files
    const images = req.body.images
    // console.log(req.body.images)
    const imageUrls = []
    for (const image of images){
      const result = await cloudinary.uploader.upload(image.path, {
        resource_type: "auto"
      });
      imageUrls.push(result.url)
    }
    req.images = imageUrls
    console.log(imageUrls)
    res.json( {"urls" : imageUrls })

    } catch (error) {
      console.error(error);
      // fs.unlinkSync(.path);
      res.status(500).send(`Internal Error at uploading the file - ${error}`);
    }
};

module.exports = { uploadFile };