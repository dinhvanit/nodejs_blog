const { Post, Category, Tag } = require('../models');
const { sequelizeToObject, multipleSequelizeToObject } = require("../../util/sequelize");
const e = require('express');

class PostsController {
  async create(req, res, next) {
        try {
            // Lấy tất cả categories và tags từ database
            const categories = await Category.findAll();
            const tags = await Tag.findAll();

            // Render view và truyền dữ liệu qua
            res.render('posts/create', {
                categories: multipleSequelizeToObject(categories),
                tags: multipleSequelizeToObject(tags)
            });
        } catch (error) {
            next(error);
        }
    }

  async store(req, res, next) {
        try {
            // Dữ liệu từ form
            const { title, categoryId, featuredImage, content, tagIds } = req.body;

            // 1. Tạo bài viết mới
            const newPost = await Post.create({
                title,
                featuredImage,
                excerpt,
                content,
                categoryId: categoryId || null, // Nếu không chọn category thì giá trị là null
            });

            if (tagIds && tagIds.length > 0) {
                await newPost.setTags(tagIds);
            }

            // 3. Chuyển hướng về trang chủ
            res.redirect('/');

        } catch (error) {
            next(error);
        }
    }

  async show(req, res, next) {
    try {
      const post = await Post.findOne({
            where: { slug: req.params.slug },
            include: [ // Lấy thêm dữ liệu từ các bảng liên quan
                { model: Category, as: 'category' },
                { model: Tag, as: 'tags' }
            ]
        });
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
