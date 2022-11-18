// functions to specify action for each route

const Post = require('../models/post');
const validateSession = require('../util/validate-session'); // util
const validate = require('../util/validation'); // util

function getHome(req, res) {
  res.render('welcome');
}

async function getAdmin(req, res) {
  if (!res.locals.isAuth) {
    return res.status(401).render('401');
  }

  const posts = await Post.fetchAll();

  SessionErrorData = validateSession.getSessionErrorData(req, {
    title: '',
    content: '',
  });

  res.render('admin', {
    posts: posts,
    inputData: SessionErrorData,
  });
}

async function createPost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validate.postIsValid(enteredTitle, enteredContent)) {
    validateSession.flashErrorsToSession(
      req,
      {
        message: 'Invalid input - please check your data.',
        title: '',
        content: '',
      },
      function () {
        res.redirect('/admin');
      }
    );

    return; // or return res.redirect('/admin'); => Has the same effect
  }

  const post = new Post(enteredTitle, enteredContent);
  await post.save();

  res.redirect('/admin');
}
async function getPostDetail(req, res, next) {
  let post;
  try {
    post = new Post(null, null, req.params.id);
  } catch (error) {
    return res.render('404');
  }
  await post.fetch();

  if (!post.title || !post.content) {
    // 404.ejs is missing at this point - it will be added later!
  }

  sessionErrorData = validateSession.getSessionErrorData(req, {
    title: post.title,
    content: post.content,
  });

  res.render('single-post', {
    post: post, // this post has property .id not ._id
    inputData: sessionErrorData,
  });
}

async function updatePost(req, res) {
  const enteredTitle = req.body.title;
  const enteredContent = req.body.content;

  if (!validate.postIsValid(enteredTitle, enteredContent)) {
    validateSession.flashErrorsToSession(
      req,
      {
        message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent,
      },
      function () {
        res.redirect(`/posts/${req.params.id}/edit`);
      }
    );
    return;
  }
  const post = new Post(enteredTitle, enteredContent, req.params.id);
  await post.update();

  res.redirect('/admin');
}

async function deletePost(req, res) {
  const post = new Post(null, null, req.params.id);
  await post.delete();
  res.redirect('/admin');
}

module.exports = {
  getHome: getHome,
  getAdmin: getAdmin,
  createPost: createPost,
  getPostDetail: getPostDetail,
  updatePost: updatePost,
  deletePost: deletePost,
};
