const express = require('express');
const bcrypt = require('bcryptjs');

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {
  let sessionInputData = req.session.inputData;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: '',
      confirmEmail: '',
      password: '',
    };
  }

  req.session.inputData = null; // clear data

  res.render('signup', { inputData: sessionInputData });
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredConfirmEmail = userData['confirm-email']; // because of "-"
  const enteredPassword = userData.password;
  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    enteredPassword.trim() < 6 || // remove blank spaces
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes('@')
  ) {
    req.session.inputData = {
      hasError: true,
      message: 'Invalid input - please check your data.',
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      return res.redirect('/signup');
    });
    return;
  }

  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: enteredEmail });

  if (existingUser) {
    console.log('user email exists already');
    return res.redirect('/signup');
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12); // 12 --> how strong decoded
  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await db.getDb().collection('users').insertOne(user);

  res.redirect('/login');
});

router.post('/login', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection('users')
    .findOne({ email: enteredEmail });

  if (!existingUser) {
    console.log('Could not log in');
    return res.redirect('/login');
  }

  const passwordFlag = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordFlag) {
    console.log('Could not log in, password not equal');
    return res.redirect('/login');
  }

  req.session.user = { id: existingUser._id, email: existingUser.email }; // user session
  req.session.isAuthenticated = true;
  req.session.save(function () {
    // Check the user "ticket"
    if (req.session.isAuthenticated) {
      return res.status(401).render('401'); // access denied
    }

    res.redirect('/admin'); // only executed once save is complete
  });

  // res.redirect('/admin'); // express session will automatically store session into db
  // however we can redirect too early before session is stored
});

router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/logout', function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
});

module.exports = router;
