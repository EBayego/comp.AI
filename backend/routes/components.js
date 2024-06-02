const express = require('express');
const { getComponents } = require('../controllers/componentsController');
const router = express.Router();

router.get('/components', getComponents);

module.exports = router;