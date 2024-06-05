const express = require('express');
const { getPopularProducts } = require('../controllers/componentsController');
const router = express.Router();

router.get('/popular-products', getPopularProducts);

module.exports = router;