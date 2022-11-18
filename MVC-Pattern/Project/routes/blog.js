const express = require('express');

const blogControllers = require('../controllers/post-controllers');
const protectRoute = require('../middlewares/auth-protection-middleware');

const router = express.Router();

router.get('/', blogControllers.getHome); // should be accessible by anyone

router.use(protectRoute); // all routes after this will be protected

router.get('/admin', blogControllers.getAdmin);

router.post('/posts', blogControllers.createPost);

router.get('/posts/:id/edit', blogControllers.getPostDetail);

router.post('/posts/:id/edit', blogControllers.updatePost);

router.post('/posts/:id/delete', blogControllers.deletePost);

module.exports = router;
