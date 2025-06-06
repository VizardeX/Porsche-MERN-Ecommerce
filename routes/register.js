const express = require('express');
const router = express.Router();
const { register } = require('../controllers/main');

// Define the routes for login and register
router.post('/', register);

module.exports = router;
