const express = require('express')
const imgur = require('imgur')

const router = express.Router()
const MainController = require('../controllers/userController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')
const isAuth = require('../middlewares/auth/isAuth')
const {
  userSignInRequest,
  userSignUpRequest,
  userUpdatePasswordRequest,
} = require('../middlewares/request/userRequest')

// GET: /users
router.post('/sign_in',userSignInRequest, asyncErrorHandler(MainController.signIn))
router.post('/sign_up', userSignUpRequest, asyncErrorHandler(MainController.signUp))
router.post('/update_password', userUpdatePasswordRequest, isAuth, asyncErrorHandler(MainController.updatePassword))
router.get('/profile', isAuth, asyncErrorHandler(MainController.findProfile))
router.patch('/profile', isAuth, asyncErrorHandler(MainController.updateProfile))
router.post('/upload', isAuth, asyncErrorHandler(MainController.uploadToImgur))


module.exports = router
