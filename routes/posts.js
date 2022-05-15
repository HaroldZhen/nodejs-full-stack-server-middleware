const express = require('express')

const router = express.Router()
const MainController = require('../controllers/postController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')
const isAuth = require('../middlewares/auth/isAuth')
const {
  postCreateRequest,
  postUpdateRequest
} = require('../middlewares/request/postRequest')

// GET: /posts/
router.use(isAuth)
router.get('/', asyncErrorHandler(MainController.getPosts))
router.post('/', postCreateRequest, asyncErrorHandler(MainController.createPost))
router.delete('/', asyncErrorHandler(MainController.deletePosts))
router.patch('/:id', postUpdateRequest, asyncErrorHandler(MainController.updatePost))
// router.delete('/:id', asyncErrorHandler(PostsController.deletePost))

module.exports = router
