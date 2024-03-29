const express = require("express")
const router = express.Router()

const { getSpace , getAllSpaces ,createSpace } = require("../controllers/SpaceController")

router.get("/all", getAllSpaces)
router.get("/:id", getSpace)
router.post("/",createSpace)

module.exports = router