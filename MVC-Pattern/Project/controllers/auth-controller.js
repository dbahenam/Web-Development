const User = require('../models/user');

const validateSession = require('../util/validate-session'); // util
const validate = require('../util/validation'); // util

const bcrypt = require('bcryptjs'); // delete
const session = require('../config/session');

function get401(req, res) {
  res.status(401).render('401');
}

function getSignup(req, res) {
  sessionErrorData = validateSession.getSessionErrorData(req);

  res.render('signup', {
    inputData: sessionErrorData,
  });
}

function getLogin(req, res) {
  sessionErrorData = validateSession.getSessionErrorData(req);

  res.render('login', {
    inputData: sessionErrorData,
  });
}

async function postSignup(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData['confirm-email'];
  const enteredPassword = userData.password;

  if (
    !validate.signupIsValid(enteredEmail, enteredConfirmEmail, enteredPassword)
  ) {
    validateSession.flashErrorsToSession(
      req,
      {
        hasError: true,
        message: 'Invalid input - please check your data.',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/signup');
      }
    );
    return;
  }

  const existingUser = new User(enteredEmail);
  await existingUser.fetch();

  if (existingUser) {
    validateSession.flashErrorsToSession(
      req,
      {
        hasError: true,
        message: 'Invalid input - please check your data.',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/signup');
      }
    );
    return;
  }

  const hashedPassword = await bcrypt.hash(enteredPassword, 12);

  const user = {
    email: enteredEmail,
    password: hashedPassword,
  };

  await User.save(user);

  res.redirect('/login');
}

async function postLogin(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

  const existingUser = new User(enteredEmail);
  await existingUser.fetch();

  if (!existingUser) {
    validateSession.flashErrorsToSession(
      req,
      {
        hasError: true,
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/login');
      }
    );
    return;
  }

  const passwordsAreEqual = await bcrypt.compare(
    enteredPassword,
    existingUser.password
  );

  if (!passwordsAreEqual) {
    validateSession.flashErrorsToSession(
      req,
      {
        hasError: true,
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      },
      function () {
        res.redirect('/login');
      }
    );
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect('/admin');
  });
}

function postLogout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect('/');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  postSignup: postSignup,
  postLogin: postLogin,
  postLogout: postLogout,
  get401: get401,
};
