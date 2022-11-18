const express = require('express');
const path = require('path');
const csrf = require('csurf');

const db = require('./data/database');
const blogRoutes = require('./routes/blog.js');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session); // a class

const sessionStore = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/mvc_blog', // path to db
  databaseName: 'mvc_blog', // database name
  collection: 'mySessions', // collection name
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'This is a secret', // for securing a session
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: sessionStore, // where the data is actually stored
    resave: false, // session is only updated in a database if the data would be changed
    saveUninitialized: false, // session is only stored once we have some data in it.
  })
);

app.use(async function (req, res, next) {
  const user = req.session.user;
  const isAuth = req.session.isAuthenticated;

  if (!user || !isAuth) {
    return next();
  }

  res.locals.isAuth = isAuth;

  next();
});

app.use(csrf());

app.use(blogRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
