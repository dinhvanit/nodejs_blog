const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostsController');

router.get('/create', postsController.create);
router.post('/store', postsController.store);
router.get('/:slug', postsController.show);

module.exports = router;
