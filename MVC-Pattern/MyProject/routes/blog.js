const express = require('express');
const bcrypt = require('bcryptjs');
const mongodb = require('mongodb');
const csrf = require('csurf');

const db = require('../data/database');

const ObjectId = mongodb.ObjectId;
const router = express.Router();

router.get('/', function (req, res) {
  res.render('index', { csrfToken: req.csrfToken() });
});

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      password: '',
    };
  }
  req.session.inputData = null;
  res.render('signup', {
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
});

router.post('/signup', async function (req, res) {
  const inputData = req.body;
  console.log(inputData['confirm-email']);
  // check user input
  if (
    !inputData.email ||
    !inputData.email.includes('@') ||
    inputData.email.length < 6 ||
    inputData['confirm-email'] !== inputData.email ||
    inputData.password.trim().length < 6
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input -- Check your data',
      email: inputData.email,
      confirmedEmail: inputData['confirm-email'],
      password: inputData.password,
    };
    //save to database before redirecting
    req.session.save(function () {
      res.redirect('/signup');
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: inputData.email });

  if (existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'A user with that email already exists',
      email: inputData.email,
      confirmedEmail: inputData['confirm-email'],
      password: inputData.password,
    };
    //save to database before redirecting
    req.session.save(function () {
      res.redirect('/signup');
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(inputData.password, 12);

  const user = {
    email: inputData.email,
    confirmEmail: inputData['confirm-email'],
    password: hashedPassword,
  };

  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
});

router.get('/login', function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      password: '',
    };
  }
  req.session.inputData = null;
  res.render('login', {
    inputData: sessionInputData,
    csrfToken: req.csrfToken(),
  });
});

router.post('/login', async function (req, res) {
  const inputData = req.body;
  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: inputData.email });
  if (!existingUser) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input -- Check your credentials',
      email: inputData.email,
      confirmedEmail: inputData['confirm-email'],
      password: inputData.password,
    };
    //save to database before redirecting
    req.session.save(function () {
      res.redirect('/login');
    });
    return;
  }
  const passwordsAreEqual = await bcrypt.compare(
    inputData.password,
    existingUser.password
  );
  if (!passwordsAreEqual) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input -- Check your credentials',
      email: inputData.email,
      confirmedEmail: inputData['confirm-email'],
      password: inputData.password,
    };
    //save to database before redirecting
    req.session.save(function () {
      res.redirect('/signup');
    });
    return;
  }
  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect('/admin');
  });
});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

router.get('/admin', async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.render('401');
  }
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      message: '',
      title: '',
      content: '',
    };
  }
  const posts = await db.getDb().collection('posts').find().toArray();
  res.render('admin', {
    inputData: sessionInputData,
    posts: posts,
    csrfToken: req.csrfToken(),
  });
});

router.post('/posts', async function (req, res) {
  const inputData = req.body;
  const enteredTitle = inputData.title;
  const enteredContent = inputData.content;

  if (
    !enteredTitle ||
    !enteredContent ||
    enteredContent.length < 20 ||
    enteredTitle.length < 6
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'There is an error',
      title: enteredTitle,
      content: enteredContent,
    };
    req.session.save(function () {
      res.redirect('/admin');
    });
    return;
  }
  const newPost = {
    title: enteredTitle,
    content: enteredContent,
  };

  await db.getDb().collection('posts').insertOne(newPost);

  res.redirect('/admin');
});

module.exports = router;
