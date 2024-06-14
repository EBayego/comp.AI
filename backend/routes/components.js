const express = require('express');
const { getPopularProducts, searchProducts } = require('../controllers/componentsController');
const router = express.Router();

router.get('/popular-products', getPopularProducts);
router.get('/search', searchProducts);

module.exports = router;