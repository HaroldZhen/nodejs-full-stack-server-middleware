// const _ = require('lodash')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const appError = require('../middlewares/errorHandlers/appErrorHandler')

// 登入
async function signIn(req, res, next) {
  const {account, password} = req.body

  const user = await User.findOne({
    account
  }).select('+password')

  if (!user) {
    next(appError(400, '該帳號不存在', next));
  }

  const isAuth = await bcrypt.compare(password, user.get('password'))
  user.password = null
  if (!isAuth) {
    next(appError(400, '您的密碼不正確', next));
  }

  // 產生 JWT token
  const token = jwt.sign({
    id: user.get('_id')
  }, process.env.JWT_SECRET, {expiresIn: 60 * 60});

  res.status(200).json({
    statue: 'success',
    data: {
      token,
      name: user.get('name'),
      account: user.get('account'),
    },
  })
}

// 註冊
async function signUp(req, res) {
  const {account, password, name} = req.body
  const pwd = await bcrypt.hash(password, +process.env.BCRYPT_SALT)
  await User.create({
    name,
    account,
    password: pwd,
    createdAt: Date.now(),
  })

  res.status(200).json({
    statue: 'success',
    data: {
      name,
      account,
    },
  })
}

// 重設密碼
async function updatePassword(req, res) {
  const {user} = req
  const {password} = req.body
  const pwd = await bcrypt.hash(password, +process.env.BCRYPT_SALT)

  await User.findByIdAndUpdate(user.get('_id'), {
      password: pwd,
      updatedAt: Date.now(),
    },
    {runValidators: true})

  res.status(200).json({
    statue: 'success',
    data: {
      name: user.name,
      account: user.account,
    },
  })
}

// 取得個人資料
async function findProfile(req, res) {
  const {user} = req

  const currentUser = await User.findById(user.get('_id')).select({account: 1, createdAt: 0, updatedAt: 0})

  res.status(200).json({
    statue: 'success',
    data: {
      currentUser
    },
  })
}

// 更新個人資料
async function updateProfile(req, res) {
  const {user} = req
  const {name, gender} = req.body

  await User.findByIdAndUpdate(user.get('_id'), {
      name,
      gender,
      updatedAt: Date.now(),
    },
    {runValidators: true})

  res.status(200).json({
    statue: 'success',
    data: user,
  })
}

module.exports = {
  signIn,
  signUp,
  updatePassword,
  findProfile,
  updateProfile,
}
