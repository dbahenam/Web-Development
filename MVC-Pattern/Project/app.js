const path = require('path');

const express = require('express');
const session = require('express-session');
const csrf = require('csurf');

const sessionConfig = require('./config/session');
const authMiddleware = require('./middlewares/auth-middleware');
const addCSRFToken = require('./middlewares/csrf-token-middleware');

const db = require('./data/database');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

const mongoDbSessionStore = sessionConfig.createSessionStore(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));
app.use(csrf());

app.use(addCSRFToken);
app.use(authMiddleware);
// app.use(guardRoute); will not work because authRoutes and blogRoutes won't be reached

app.use(authRoutes);
app.use(blogRoutes);
// app.use(guardRoute);  will not work because at this point our controllers already
// handle the route so it will be too late if we want to block it

app.use(function (error, req, res, next) {
  console.log(error);
  res.render('500');
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
