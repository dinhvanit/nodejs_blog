const Post = require('../models/Post');
const { multipleSequelizeToObject } = require('../../util/sequelize');

class SiteController {
    async index(req, res, next) {
        try {
            const posts = await Post.findAll({
                where: { status: 'published' },
            });
            res.render('home', {
                posts: multipleSequelizeToObject(posts),
            });
        } catch (err) {
            next(err); // Chuyển lỗi cho middleware
        }
    }
}

module.exports = new SiteController();
