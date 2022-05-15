const express = require('express')

const router = express.Router()
const PostsController = require('../controllers/postController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')

// GET: /posts/
router.get('/', asyncErrorHandler(PostsController.getPosts))
router.get('/earliest', asyncErrorHandler(PostsController.getPostsEarliest))
router.get('/keyword/:word', asyncErrorHandler(PostsController.getPostsKeyword))
router.post('/', asyncErrorHandler(PostsController.createPost))
router.delete('/', asyncErrorHandler(PostsController.deletePosts))
router.delete('/:id', asyncErrorHandler(PostsController.deletePost))
router.patch('/:id', asyncErrorHandler(PostsController.updatePost))

module.exports = router
