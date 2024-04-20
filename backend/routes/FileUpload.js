const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerSetup");
const { uploadFile } = require("../controllers/imageUploadController");

//File upload route
// router.post("/upload", upload.single("file"), uploadFile);
router.post("/create", upload.array("images"), uploadFile);

module.exports = router;