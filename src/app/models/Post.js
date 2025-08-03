// src/app/models/Post.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');
const slugify = require('slugify');

const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    content: { type: DataTypes.TEXT },
    excerpt: { type: DataTypes.TEXT },
    featuredImage: { type: DataTypes.STRING },
    status: { type: DataTypes.ENUM('published', 'draft'), defaultValue: 'published' },
    categoryId: { type: DataTypes.INTEGER } // Giữ lại foreign key
}, {
    tableName: 'posts',
});

Post.beforeValidate((post, options) => {
    // Tạo slug
    if (post.title && !post.slug) { 
        post.slug = slugify(post.title, { lower: true, strict: true, locale: 'vi' });
    }

    // Tự động tạo excerpt nếu trường excerpt bị bỏ trống
    if (post.content && !post.excerpt) {
        const plainContent = post.content.replace(/(<([^>]+)>)/gi, '');
        post.excerpt = plainContent.substring(0, 200) + '...';
    }
});

module.exports = Post;