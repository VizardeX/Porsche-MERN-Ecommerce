const express = require('express');
const router = express.Router();
const { login } = require('../controllers/main');

// Define the routes for login and register
router.post('/', login);

module.exports = router;
