const Post = require('../models/PostModel')
const appError = require('../middlewares/errorHandlers/appErrorHandler')

async function getPosts(req, res) {
  const posts = await Post.find().sort('-createdAt').select({__v: 0})
  res.status(200).json({
    statue: 200,
    data: posts,
  })
}

async function getPostsEarliest(req, res) {
  const posts = await Post.find().sort('createdAt').select({__v: 0})
  res.status(200).json({
    statue: 200,
    data: posts,
  })
}

async function getPostsKeyword(req, res) {
  const keyword = req.url.split('/').pop()
  const query = keyword
    ? {
      content: {$regex: decodeURIComponent(keyword)},
    }
    : ''
  const posts = await Post.find(query).sort('createdAt').select({__v: 0})
  res.status(200).json({
    statue: 200,
    data: posts,
  })
}

async function deletePosts(req, res) {
  await Post.deleteMany({})
  await getPosts(req, res)
}

async function createPost(req, res, next) {
  const {name, content, image, email} = req.body
  if (!(content && name && email)) {
    next(appError(400, "你沒有填寫 content 資料", next))
  }
  const post = await Post.create({
    ownerAccount: email,
    ownerName: name,
    content,
    image,
    createdAt: Date.now(),
  })
  res.status(200).json({
    statue: 'success',
    data: post,
  })
}

async function deletePost(req, res, next) {
  const id = req.url.split('/').pop()
  if (!await Post.findByIdAndDelete(id)) {
    next(appError(404, "刪除失敗：Post找不到該id", next))
  }
  await getPosts(req, res)
}

async function updatePost(req, res, next) {
  const {content} = req.body
  const id = req.url.split('/').pop()
  if (!
    await Post.findByIdAndUpdate(id, {
      content,
      updatedAt: Date.now(),
    })
  ) {
    next(appError(404, '更新失敗：Post找不到該id', next))
  }
  await getPosts(req, res)
}

module.exports = {
  getPosts,
  getPostsEarliest,
  getPostsKeyword,
  createPost,
  deletePost,
  deletePosts,
  updatePost,
}
