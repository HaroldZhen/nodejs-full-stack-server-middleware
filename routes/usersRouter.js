const express = require('express')

const router = express.Router()
const MainController = require('../controllers/userController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')
const isAuth = require('../middlewares/auth/isAuth')
const {
  userUnFollowRequest,
  userFollowRequest,
  userSignInRequest,
  userSignUpRequest,
  userUpdatePasswordRequest,
} = require('../middlewares/request/userRequest')

// Router: /users
router.post('/sign_up', userSignUpRequest, asyncErrorHandler(MainController.signUp))
router.post('/sign_in',userSignInRequest, asyncErrorHandler(MainController.signIn))
router.post('/update_password', userUpdatePasswordRequest, isAuth, asyncErrorHandler(MainController.updatePassword))
router.get('/profile', isAuth, asyncErrorHandler(MainController.findProfile))
router.patch('/profile', isAuth, asyncErrorHandler(MainController.updateProfile))
router.get('/following', isAuth, asyncErrorHandler(MainController.followingUser))
router.get('/posts/likes', isAuth, asyncErrorHandler(MainController.postsLikesList))
router.post('/:id/follow', isAuth, userFollowRequest, asyncErrorHandler(MainController.followUser))
router.delete('/:id/unfollow', isAuth, userUnFollowRequest, asyncErrorHandler(MainController.unFollowUser))


module.exports = router
