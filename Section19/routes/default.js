const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
  // --> using ejs now
  res.render("index"); // ommit file extension
});

router.get("/about", function (req, res) {
  res.render("about");
});

module.exports = router; // router is object already
