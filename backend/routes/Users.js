const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');

// Route to create a new user
router.post('/', createUser);
router.get('/',getUsers)
module.exports = router;
