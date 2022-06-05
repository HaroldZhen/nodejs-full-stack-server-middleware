const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '未填寫姓名']
    },
    account: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      select: false
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
    },
    password: {
      type: String,
      required: [true, '請輸入密碼'],
      minlength: 8,
      select: false
    },
    createdAt: {
      type: Date,
      default: '',
      select: true,
    },
    updatedAt: {
      type: Date,
      default: '',
      select: true,
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    followers: [
      {
        user: {type: mongoose.Schema.ObjectId, ref: 'User'},
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    following: [
      {
        user: {type: mongoose.Schema.ObjectId, ref: 'User'},
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    versionKey: false
  }
)

const User = mongoose.model('User', UserSchema)

module.exports = User
