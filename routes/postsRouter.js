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
router.get('/posts', isAuth, asyncErrorHandler(MainController.getPosts))
router.post('/posts', isAuth, postCreateRequest, asyncErrorHandler(MainController.createPost))
router.delete('/posts', isAuth, asyncErrorHandler(MainController.deletePosts))
router.patch('/posts/:id', isAuth, postUpdateRequest, asyncErrorHandler(MainController.updatePost))
router.delete('/post/:id', isAuth, postDeleteRequest, asyncErrorHandler(MainController.deletePost))


module.exports = router
