require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const connectDB = require('./configs/connectMongoose')
const corsOptions = require('./configs/corsOptions')

connectDB()

const indexRouter = require('./routes/index')
const postsRouter = require('./routes/posts')
const postRouter = require('./routes/post')

process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
  // eslint-disable-next-line no-console
  console.error('Uncaughted Exception！')
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use(cors(corsOptions))
app.use('/posts', postsRouter)
app.use('/post', postRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// 自己設定的 err 錯誤
const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message
    });
  } else {
    // log 紀錄
    // eslint-disable-next-line no-console
    console.error('出現重大錯誤', err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: 'error',
      message: '系統錯誤，請恰系統管理員'
    });
  }
};
// 開發環境錯誤
const resErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  });
};

// 錯誤處理
app.use((err, req, res, next) => {
  // dev
  // eslint-disable-next-line no-param-reassign
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    // eslint-disable-next-line no-param-reassign
    console.error(err)
    return resErrorDev(err, res);
  }
  // production
  if (err.name === 'ValidationError'){
    // eslint-disable-next-line no-param-reassign
    err.message = "資料欄位未填寫正確，請重新輸入！"
    // eslint-disable-next-line no-param-reassign
    err.isOperational = true;
    return resErrorProd(err, res)
  }
  return resErrorProd(err, res)
});


// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  // eslint-disable-next-line no-console
  console.error('未捕捉到的 rejection：', promise, '原因：', err);
});

module.exports = app
