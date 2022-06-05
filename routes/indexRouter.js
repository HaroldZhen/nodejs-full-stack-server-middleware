const express = require('express')
const {ImgurClient} = require("imgur")
const utils = require("../helper/utils")
const isAuth = require("../middlewares/auth/isAuth")
const asyncErrorHandler = require("../middlewares/errorHandlers/asyncErrorHandler")

const router = express.Router()

/* GET home page. */
// Router: /
router.get('/', (req, res, next) => {
  res.send('index')
})


// Router: /upload
// 上傳圖片
router.post('/upload', isAuth, asyncErrorHandler((req, res) => {
  utils.upload(req, res, async () => {
    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENTID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN,
    });
    const response = await client.upload({
      image: req.files[0].buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID
    });
    res.send({url: response.data.link})
  })
}))

module.exports = router
