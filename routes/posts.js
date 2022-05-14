const express = require('express')

const router = express.Router()
const PostsController = require('../controllers/postController')

// GET: /posts/
router.get('/', PostsController.getPosts)
router.get('/earliest', PostsController.getPostsEarliest)
router.get('/keyword/:word', PostsController.getPostsKeyword)
router.post('/', PostsController.createPost)
router.delete('/', PostsController.deletePosts)
router.delete('/:id', PostsController.deletePost)
router.patch('/:id', PostsController.updatePost)

module.exports = router
