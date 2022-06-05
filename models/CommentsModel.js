const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, '評論不能為空白!']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      require: ['true', '貼文ID不存在']
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      require: ['true', '文章ID不存在']
    }
  }
)

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'User',
    select: 'name id createdAt'
  })
  next()
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
