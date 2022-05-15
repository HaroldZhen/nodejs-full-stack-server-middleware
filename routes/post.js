const express = require('express')

const router = express.Router()
const MainController = require('../controllers/postController')
const asyncErrorHandler = require('../middlewares/errorHandlers/asyncErrorHandler')
const {
  postDeleteRequest,
} = require('../middlewares/request/postRequest')

// GET: /posts/
router.delete('/:id', postDeleteRequest, asyncErrorHandler(MainController.deletePost))

module.exports = router
