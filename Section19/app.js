const path = require("path");

const express = require("express");

// require our files
const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurants");

const app = express();

// views setting (reserve name by express) and path to folder where template files will be stored
app.set("views", path.join(__dirname, "views"));

// set certain options,(view engine: template engine, ejs: name of engine)
app.set("view engine", "ejs");

// extract incoming data
app.use(express.urlencoded({ extended: false }));

// request handler to check for static files from some folder(i.e "public")
// if it is not, the request will be forwarded to other routes,
app.use(express.static("public"));

app.use("/", defaultRoutes); // filter to check default routes

// don't want to add path as /restaurants because that will be added to paths in router
// i.e /restaurants/recommend
app.use("/", restaurantRoutes);

// catch all request not handled by the ones before (client-side)
// middleware: some functionality that executes on every/some incoming request
app.use(function (req, res) {
  res.status(404).render("404");
});

// standardized server-side
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
