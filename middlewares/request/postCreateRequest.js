const validator = require('validator').default
const appError = require("../errorHandlers/appErrorHandler");

const postCreateRequest = (req, res, next) => {
  const error = []
  const {name = '', content = '', email = ''} = req.body
  if (validator.isEmpty(content)) {
    error.push({
      name: "你沒有填寫 content 資料"
    })
  }
  if (validator.isEmpty(name)) {
    error.push({
      name: "你沒有填寫 name 資料"
    })
  }
  if (!validator.isEmail(email)) {
    error.push({
      email: "你沒有填寫 email 資料或格式錯誤"
    })
  }
  if(error.length>0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

module.exports = postCreateRequest
