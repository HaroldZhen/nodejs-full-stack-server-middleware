const express = require('express')

const router = express.Router()
const PostsController = require('../controllers/postController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')
const postDeleteRequest = require('../middlewares/request/postDeleteRequest')

// GET: /posts/
router.delete('/:id', postDeleteRequest, asyncErrorHandler(PostsController.deletePost))

module.exports = router
