const { Post, Category, Tag } = require("../models");
const {
  sequelizeToObject,
  multipleSequelizeToObject,
} = require("../../util/sequelize");
const e = require("express");

class PostsController {
  async create(req, res, next) {
    try {
      // Lấy tất cả categories và tags từ database
      const categories = await Category.findAll();
      const tags = await Tag.findAll();

      // Render view và truyền dữ liệu qua
      res.render("posts/create", {
        categories: multipleSequelizeToObject(categories),
        tags: multipleSequelizeToObject(tags),
        TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
      });
    } catch (error) {
      next(error);
    }
  }

  async store(req, res, next) {
    try {
      // Dữ liệu từ form
      const { title, categoryId, featuredImage, content, excerpt, tagIds } =
        req.body;

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
      res.redirect("/");
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const post = await Post.findOne({
        where: { slug: req.params.slug },
        include: [
          // Lấy thêm dữ liệu từ các bảng liên quan
          { model: Category, as: "category" },
          { model: Tag, as: "tags" },
        ],
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

  // [GET] /posts/:id/edit
  async edit(req, res, next) {
    try {
      const [post, categories, tags] = await Promise.all([
        Post.findByPk(req.params.id, {
          include: { model: Tag, as: "tags" },
        }),
        Category.findAll(),
        Tag.findAll(),
      ]);

      if (post) {
        // Lấy TINYMCE_API_KEY từ .env để truyền cho view
        const TINYMCE_API_KEY = process.env.TINYMCE_API_KEY;

        res.render("posts/edit", {
          post: sequelizeToObject(post),
          categories: multipleSequelizeToObject(categories),
          tags: multipleSequelizeToObject(tags),
          TINYMCE_API_KEY,
        });
      } else {
        res.status(404).send("Không tìm thấy bài viết để sửa");
      }
    } catch (error) {
      next(error);
    }
  }

  // ✨ 2. THÊM HÀM `update` ĐỂ LƯU THAY ĐỔI ✨
  // [PUT] /posts/:id
  async update(req, res, next) {
    try {
      const post = await Post.findByPk(req.params.id);

      if (post) {
        const { title, categoryId, content, excerpt, tagIds, featuredImage } =
          req.body;

        await post.update({
          title,
          content,
          excerpt,
          featuredImage, // Giả sử vẫn dùng URL
          categoryId: categoryId || null,
        });

        if (tagIds) {
          await post.setTags(tagIds);
        } else {
          // Nếu không có tag nào được chọn, hãy xóa hết các tag cũ
          await post.setTags([]);
        }

        res.redirect(`/posts/${post.slug}`);
      } else {
        res.status(404).send("Không thể cập nhật bài viết không tồn tại");
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostsController();
