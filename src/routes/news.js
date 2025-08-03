const express = require('express');
const router = express.Router();
const newsController = require('../app/controllers/NewsControllers');

// Route tĩnh đặt trước
router.get('/', newsController.index);

// Route động đặt sau
router.get('/:slug', newsController.show);

module.exports = router;