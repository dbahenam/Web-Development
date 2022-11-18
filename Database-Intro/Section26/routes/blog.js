const express = require("express");
const mongodb = require("mongodb");

const db = require("../data/database");

const router = express.Router();

const ObjectId = mongodb.ObjectId;

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db
    .getDB()
    .collection("posts")
    .find({}, { title: 1, summary: 1, "author.name": 1 })
    .toArray();

  res.render("posts-list", { posts: posts });
});

router.post("/posts", async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDB()
    .collection("authors")
    .findOne({ _id: authorId });

  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: authorId,
      name: author.name,
      email: author.email,
    },
  };
  const result = await db.getDB().collection("posts").insertOne(newPost);
  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDB().collection("authors").find().toArray();
  res.render("create-post", { authors: authors });
});

router.get("/post/:id", async function (req, res) {
  const postId = req.params.id;
  const post = await db
    .getDB()
    .collection("posts")
    .findOne({ _id: new ObjectId(postId) }, { summary: 0 });

  if (!post) {
    return res.status(404).render("404");
  }
  post.humanReadableDate = post.date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  post.date = post.date.toISOString();
  res.render("post-detail", { post: post });
});

router.get("/posts/:id/edit", async function (req, res, next) {
  let postID = req.params.id;
  try {
    postID = new ObjectId(postID);
  } catch (error) {
    return next(error);
  }
  const post = await db
    .getDB()
    .collection("posts")
    .findOne({ _id: new ObjectId(postID) }, { title: 1, summary: 1, body: 1 });
  console.log(post);
  if (!post) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: post });
});

router.post("/posts/:id/edit", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDB()
    .collection("posts")
    .updateOne(
      { _id: postId },
      {
        $set: {
          title: req.body.title,
          summary: req.body.summary,
          body: req.body.content,
        },
      }
    );
  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  const postId = new ObjectId(req.params.id);
  const result = await db
    .getDB()
    .collection("posts")
    .deleteOne({ _id: postId });
  res.redirect("/");
});
module.exports = router;
