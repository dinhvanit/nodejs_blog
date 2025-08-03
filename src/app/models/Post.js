// src/app/models/Post.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    content: { type: DataTypes.TEXT },
    featuredImage: { type: DataTypes.STRING }, // Sequelize sẽ tự chuyển camelCase thành snake_case trong DB
    status: { type: DataTypes.ENUM('published', 'draft'), defaultValue: 'published' },
}, {
    tableName: 'posts', // Bắt buộc Sequelize dùng đúng tên bảng 'posts'
});


module.exports = Post;