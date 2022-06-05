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

// Router: /posts
router.get('/posts/:id', isAuth, asyncErrorHandler(MainController.getPost))
router.get('/posts', isAuth, asyncErrorHandler(MainController.getPosts))
router.post('/posts', isAuth, postCreateRequest, asyncErrorHandler(MainController.createPost))
router.delete('/posts/all', isAuth, asyncErrorHandler(MainController.deletePosts))
router.patch('/posts/:id', isAuth, postUpdateRequest, asyncErrorHandler(MainController.updatePost))
router.delete('/post/:id', isAuth, postDeleteRequest, asyncErrorHandler(MainController.deletePost))
router.post('/posts/:id/likes', isAuth, asyncErrorHandler(MainController.addLikes))
router.delete('/posts/:id/likes', isAuth, asyncErrorHandler(MainController.delLikes))
router.post('/posts/:id/comment', isAuth, asyncErrorHandler(MainController.addComment))
router.delete('/posts/comment/:id', isAuth, asyncErrorHandler(MainController.delComment))

// Router: /post
router.get('/post/user/:id', isAuth, asyncErrorHandler(MainController.getPostByUser))

module.exports = router
