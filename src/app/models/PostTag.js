const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

const PostTag = sequelize.define(
    'PostTag',
    {
        // Bảng này chỉ cần các foreign key, Sequelize sẽ tự động thêm
        // postId: DataTypes.INTEGER,
        // tagId: DataTypes.INTEGER
    },
    {
        tableName: 'post_tags',
        timestamps: false,
    },
);

module.exports = PostTag;
