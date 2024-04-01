const express = require("express")
const router = express.Router()

const { getSpace , getAllSpaces , createSpace , updateSpace } = require("../controllers/SpaceController")

router.get("/all", getAllSpaces)
router.get("/:id", getSpace)
router.post("/", createSpace)
router.put("/:id", updateSpace)
module.exports = router