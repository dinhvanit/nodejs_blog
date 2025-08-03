const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const db = require('./config/db');

const route = require('./routes/index');

db.connectDB

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Template engine config
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            formatDate: (date) => date.toLocaleDateString('vi-VN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }),
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
