const express = require('express');

const weatherController = require('../controllers/weather');

const router = express.Router();

router.get('/search', weatherController.getLocation);
router.get('/', weatherController.getWeather);

module.exports = router;