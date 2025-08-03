
module.exports = {
    multipleSequelizeToObject: function (sequelizeArray) {
        return sequelizeArray.map(item => item.get({ plain: true }));
    },
    sequelizeToObject: function (sequelizeItem) {
        return sequelizeItem ? sequelizeItem.get({ plain: true }) : sequelizeItem;
    }
};