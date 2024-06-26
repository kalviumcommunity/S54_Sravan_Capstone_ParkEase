const multer = require("multer");

// Multer Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp'); // Use /tmp directory for writable access
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;