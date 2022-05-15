const validator = require('validator').default
const appError = require("../errorHandlers/appErrorHandler");

const postUpdateRequest = (req, res, next) => {
  const error = []
  const id = req.url.split('/').pop()
  if (validator.isEmpty(id)) {
    error.push({
      name: "你沒有填寫 post id 資料"
    })
  }
  const {content} = req.body
  if (validator.isEmpty(content)) {
    error.push({
      name: "你沒有填寫 content 資料"
    })
  }
  if(error.length>0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

module.exports = postUpdateRequest
