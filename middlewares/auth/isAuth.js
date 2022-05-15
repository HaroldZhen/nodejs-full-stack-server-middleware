const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const appError = require("../errorHandlers/appErrorHandler")

const isAuth = async (req, res, next) => {
  console.log('isAuth')
  // 確認 token 是否存在
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // eslint-disable-next-line prefer-destructuring
    token = req.headers.authorization.split(' ').pop();
  }

  if (!token) {
    return next(appError(401, '你尚未登入！', next));
  }

  // 驗證 token 正確性
  const decoded = await new Promise((resolve,reject)=>{
    jwt.verify(token, process.env.JWT_SECRET,(err,payload)=>{
      if(err){
        reject(err)
      }else{
        resolve(payload)
      }
    })
  }).catch(() => next(appError(401, '非法Token', next)))

  const currentUser = await User.findById(decoded.id)

  req.user = currentUser
  return next()
}

module.exports = isAuth
