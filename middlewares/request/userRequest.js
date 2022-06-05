const validator = require('validator').default
const appError = require("../errorHandlers/appErrorHandler");
const User = require('../../models/UserModel')

const userCreateRequest = async (req, res, next) => {
  const error = {}
  const {name = '', email = ''} = req.body
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
      account: "email格式錯誤"
    })
  }
  if (error.length > 0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

const userSignInRequest = (req, res, next) => {
  const error = []
  const {account = '', password = ''} = req.body
  if (validator.isEmpty(account)) {
    error.push({
      account: "你沒有填寫 account 資料"
    })
  }
  if (validator.isEmpty(password)) {
    error.push({
      password: "你沒有填寫 password 資料"
    })
  }
  if (!validator.isEmpty(account) && !validator.isEmail(account)) {
    error.push({
      account: "account 格式錯誤"
    })
  }
  if (error.length > 0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

const userSignUpRequest = async (req, res, next) => {
  const error = []
  const {name = '', account = '', password = ''} = req.body
  if (validator.isEmpty(name)) {
    error.push({
      name: "你沒有填寫 name 資料"
    })
  }
  if (validator.isEmpty(account)) {
    error.push({
      account: "你沒有填寫 account 資料"
    })
  }
  if (validator.isEmpty(password)) {
    error.push({
      password: "你沒有填寫 password 資料"
    })
  }
  if (!validator.isEmpty(account) && !validator.isEmail(account)) {
    error.push({
      account: "account email格式錯誤"
    })
  }

  if (error.length > 0) {
    next(appError(400, JSON.stringify(error), next))
  }

  // check User
  const user = await User.findOne({account})
  if (user?.get('_id')) error.push({account: "該帳號已存在"})

  if (error.length > 0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

const userUpdatePasswordRequest = async (req, res, next) => {
  const error = []
  const {password = '', confirm_password:confirmPassword = ''} = req.body
  if (validator.isEmpty(password)) {
    error.push({
      password: "你沒有填寫 password 資料"
    })
  }
  if (validator.isEmpty(confirmPassword)) {
    error.push({
      password: "你沒有填寫 confirmPassword 資料"
    })
  }

  if (error.length > 0) {
    next(appError(400, JSON.stringify(error), next))
  }

  if (password !== confirmPassword) {
    error.push({
      password: "二個密碼不符合"
    })
  }

  if (error.length > 0) {
    next(appError(400, JSON.stringify(error), next))
  }
  next()
}

const userFollowRequest = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    next(appError(401, '您無法追蹤自己', next));
  }
  next()
}

const userUnFollowRequest = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    next(appError(401,'您無法取消追蹤自己',next));
  }
  next()
}

module.exports = {
  userUnFollowRequest,
  userSignUpRequest,
  userSignInRequest,
  userCreateRequest,
  userUpdatePasswordRequest,
  userFollowRequest,
}
