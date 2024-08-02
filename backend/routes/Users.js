const express = require('express');
const router = express.Router();
const { createUser,createBooking, getUsers , getUserSpaces } = require('../controllers/userController');
const { getBookedSpaces } = require("../controllers/SpaceController")

// Route to create a new user
router.post('/', createUser);
router.post("/booking", createBooking);
router.get('/:clerkUserId/spaces', getUserSpaces);
router.get("/:clerkUserId/booked-spaces", getBookedSpaces);
router.get('/',getUsers)
module.exports = router;
