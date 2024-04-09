const multer = require("multer");

//Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/assets");
    // C:\Users\srava\Desktop\FSD\Capstone\S54_Sravan_Capstone_ParkEase\client\src\assets\Park3.jpg
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;