const Post = require('../models/Post');

class SiteController {
    async index(req, res) {
        try {
            const posts = await Post.findAll(); // nếu dùng Sequelize
            res.render('home', { posts: posts.map(p => p.toJSON()) });
        } catch (err) {
            console.error(err);
            res.status(500).send('Lỗi server');
        }
    }
}

module.exports = new SiteController();
