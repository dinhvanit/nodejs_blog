const { sequelize } = require('../../config/db');

// Import tất cả các model
const Post = require('./Post');
const Category = require('./Category');
const Tag = require('./Tag');
const PostTag = require('./PostTag'); // Import cả model bảng trung gian

// Định nghĩa các mối quan hệ ở đây
// 1. Quan hệ Category - Post (Một-Nhiều)
Category.hasMany(Post, { foreignKey: 'categoryId', as: 'posts' });
Post.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// 2. Quan hệ Post - Tag (Nhiều-Nhiều)
Post.belongsToMany(Tag, {
    through: PostTag, // Sử dụng model bảng trung gian
    foreignKey: 'postId',
    as: 'tags'
});
Tag.belongsToMany(Post, {
    through: PostTag, // Sử dụng model bảng trung gian
    foreignKey: 'tagId',
    as: 'posts'
});

// Tạo một đối tượng db để export tất cả
const db = {};
db.sequelize = sequelize;
db.Post = Post;
db.Category = Category;
db.Tag = Tag;
db.PostTag = PostTag;

module.exports = db;