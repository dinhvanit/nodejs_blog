const newsRouter = require('./news');
const siteRouter = require('./site');
const postsRouter = require('./posts');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/posts', postsRouter);
    app.use('/', siteRouter);
}
module.exports = route;
