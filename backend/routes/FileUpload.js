const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerSetup"); // Correctly require the upload configuration
const { uploadFile } = require("../controllers/imageUploadController");
const { limiter } = require("../rateLimiter");

// File upload route
// router.post("/upload", upload.single("file"), uploadFile);
router.post("/create",limiter, upload.array("files"), uploadFile);

module.exports = router;
