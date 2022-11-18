const express = require("express");
const multer = require("multer");

const db = require("../data/database");

// creating a storage object as expected by multer
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    //callback function (value: pontential-error, value: destination path)
    // no error(hard code destination)
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    // unique file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig }); // destination to keep images

const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

// upload is the middleware, it has a function single to upload a single file
// that takes in the name of the input element that will have the file
router.post("/profiles", upload.single("image"), async function (req, res) {
  const uploadedImageFile = req.file;
  const userData = req.body;

  await db.getDb().collection("users").insertOne({
    name: userData.username,
    imagePath: uploadedImageFile.path,
  });

  res.redirect("/");
});

module.exports = router;
