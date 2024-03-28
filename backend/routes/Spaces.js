const express = require("express")
const router = express.Router()

const { getSpace , getAllSpaces } = require("../controllers/SpaceController")

router.get("/all", getAllSpaces)
router.get("/:id", getSpace)

module.exports = router