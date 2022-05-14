const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    ownerAccount: {
      type: String,
      required: [true, '貼文者帳號未填寫'],
    },
    ownerName: {
      type: String,
      required: [true, '貼文姓名未填寫'],
    },
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    likes: {
      type: Number,
      default: 0,
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
  },
  {
    versionKey: false,
  },
)

const Post = mongoose.model('Post', PostSchema)

module.exports = Post
