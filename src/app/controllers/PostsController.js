const Post = require("../models/Post");
const { sequelizeToObject } = require("../../util/sequelize");

class PostsController {
  create(req, res) {
    res.render("posts/create");
  }

  async store(req, res) {
    try {
      await Post.create({
        title: req.body.title,
        slug: req.body.slug,
        featuredImage: req.body.featuredImage,
        content: req.body.content,
      });
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Lỗi khi tạo bài viết");
    }
  }

  async show(req, res, next) {
    try {
      const post = await Post.findOne({ where: { slug: req.params.slug } });
      if (post) {
        res.render("posts/show", { post: sequelizeToObject(post) });
      } else {
        res.status(404).send("Không tìm thấy bài viết");
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostsController();
