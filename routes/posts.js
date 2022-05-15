const express = require('express')

const router = express.Router()
const PostsController = require('../controllers/postController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')
const postCreateRequest = require('../middlewares/request/postCreateRequest')
const postUpdateRequest = require('../middlewares/request/postUpdateRequest')

// GET: /posts/
router.get('/', asyncErrorHandler(PostsController.getPosts))
router.post('/',postCreateRequest, asyncErrorHandler(PostsController.createPost))
router.delete('/', asyncErrorHandler(PostsController.deletePosts))
router.patch('/:id',postUpdateRequest, asyncErrorHandler(PostsController.updatePost))
// router.delete('/:id', asyncErrorHandler(PostsController.deletePost))

module.exports = router
