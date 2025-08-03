const Post = require('../models/Post');

class PostsController {
    create(req, res) {
        res.render('posts/create');
    }

    async store(req, res) {
        try {
            await Post.create({
                title: req.body.title,
                slug: req.body.slug,
                featuredImage: req.body.featuredImage,
                content: req.body.content,
            });
            res.redirect('/');
        } catch (error) {
            console.error(error);
            res.status(500).send('Lỗi khi tạo bài viết');
        }
    }
}

module.exports = new PostsController();
