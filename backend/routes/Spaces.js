const express = require("express")
const router = express.Router()
const { spaceSchema , validateSpace} = require('../validation/spaceValidator')
const { getSpace , getAllSpaces , createSpace , updateSpace } = require("../controllers/SpaceController")

router.get("/all", getAllSpaces)
router.get("/:id", getSpace)
router.post("/",validateSpace(spaceSchema) , createSpace)
router.put("/:id",validateSpace(spaceSchema) , updateSpace)

module.exports = router