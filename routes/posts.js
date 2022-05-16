const express = require('express')

const router = express.Router()
const MainController = require('../controllers/postController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')
const isAuth = require('../middlewares/auth/isAuth')
const {
  postCreateRequest,
  postUpdateRequest,
  postDeleteRequest,
} = require('../middlewares/request/postRequest')

// GET: /posts/
router.use(isAuth)
router.get('/posts', asyncErrorHandler(MainController.getPosts))
router.post('/posts', postCreateRequest, asyncErrorHandler(MainController.createPost))
router.delete('/posts', asyncErrorHandler(MainController.deletePosts))
router.patch('/posts/:id', postUpdateRequest, asyncErrorHandler(MainController.updatePost))
router.delete('/post/:id', postDeleteRequest, asyncErrorHandler(MainController.deletePost))


module.exports = router
