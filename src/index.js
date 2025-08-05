const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

require('./config/passport')(passport);

const app = express();
const port = process.env.PORT || 3000;

const db = require('./config/db');
const route = require('./routes/index');

db.connectDB;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_SECRET ,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // Dùng cho lỗi của passport
    res.locals.user = req.user || null; // Lưu thông tin user nếu đã đăng nhập
    next();
});

// HTTP logger
app.use(morgan('combined'));

// Template engine config
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            formatDate: (date) =>
                date.toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }),
            eq: function (a, b) {
                return a === b;
            },
            isTagSelected: function (tagId, postTags) {
                if (!postTags || !Array.isArray(postTags)) return false;
                return postTags.some((tag) => tag.id === tagId);
            },
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
