const express = require("express");
const router = express.Router();
// const upload = require("../middleware/multerSetup");
const multer = require('multer')
const upload = multer({ dest: "uploads/" })
const { uploadFile } = require("../controllers/imageUploadController");

//File upload route
// router.post("/upload", upload.single("file"), uploadFile);
router.post("/create", upload.array("files"), uploadFile);

module.exports = router;