const validator = require('validator').default
const appError = require("../errorHandlers/appErrorHandler");

const postCreateRequest = (req, res, next) => {
  const error = []
  const {name = '', content = '', email = ''} = req.body
  if (validator.isEmpty(content)) {
    error.push({
      content: "你沒有填寫 content 資料"
    })
  }
  if (validator.isEmpty(name)) {
    error.push({
      name: "你沒有填寫 name 資料"
    })
  }
  if (validator.isEmpty(email)) {
    error.push({
      email: "你沒有填寫 email 資料"
    })
  }
  if (!validator.isEmpty(email) && !validator.isEmail(email)) {
    error.push({
      email: "email格式錯誤"
    })
  }
  if(error.length>0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

const postDeleteRequest = (req, res, next) => {
  const error = []
  const id = req.url.split('/').pop()
  if (validator.isEmpty(id)) {
    error.push({
      id: "你沒有填寫 post id 資料"
    })
  }
  if(error.length>0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

const postUpdateRequest = (req, res, next) => {
  const error = []
  const id = req.url.split('/').pop()
  if (validator.isEmpty(id)) {
    error.push({
      id: "你沒有填寫 post id 資料"
    })
  }
  const {content} = req.body
  if (validator.isEmpty(content)) {
    error.push({
      content: "你沒有填寫 content 資料"
    })
  }
  if(error.length>0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

module.exports = {
  postCreateRequest,
  postDeleteRequest,
  postUpdateRequest,
}
