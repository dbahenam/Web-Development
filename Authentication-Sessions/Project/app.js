const path = require('path');

const express = require('express');
const session = require('express-session');
const mongodbStore = require('connect-mongodb-session');

const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const MongoDBStore = mongodbStore(session); // class

const app = express();

const sessionStore = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017',
  databaseName: 'auth-demo',
  collection: 'sessions',
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Session
app.use(
  session({
    secret: 'super-secret', // a secret key (use longer in projects)
    resave: false, // session only updated in database if the data has changed
    saveUninitialized: false, // only save session into database once some data is in it
    store: sessionStore, // where session data will be stored
    cookie: {
      maxAge: 3 * 60 * 60 * 1000, // session expires in 2 hours
    },
  })
); // middleware function

app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render('500');
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
