const path = require("path");

const express = require("express");

const userRoutes = require("./routes/users");
const db = require("./data/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// won't work for form data with multipart form data
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/images", express.static("images")); //filter out "/images" from image path

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
