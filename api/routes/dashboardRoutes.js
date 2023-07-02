const express = require('express');
const router = express.Router();
const { getDashboard, createProfile, updateProfile } = require('../controllers/dashboardController');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/', authenticateToken, getDashboard);
router.post('/', authenticateToken, createProfile); 
router.put('/', authenticateToken, updateProfile); 

module.exports = router;
