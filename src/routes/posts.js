const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');

router.get('/create', postsController.create);
router.post('/store', postsController.store);

module.exports = router;
