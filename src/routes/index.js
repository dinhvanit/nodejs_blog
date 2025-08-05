const newsRouter = require('./news');
const siteRouter = require('./site');
const postsRouter = require('./posts');
const usersRouter = require('./users');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/posts', postsRouter);
    app.use('/users', usersRouter);

    app.use('/', siteRouter);
}
module.exports = route;
