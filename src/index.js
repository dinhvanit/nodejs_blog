const path = require("path");
const express = require("express");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(morgan("combined"));

// Template engine config
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/news", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
