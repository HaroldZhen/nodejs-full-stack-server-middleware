const _ = require('lodash')
const Post = require('../models/PostModel')
const appError = require('../middlewares/errorHandlers/appErrorHandler')

async function getPosts(req, res) {
  const timeSort = req.query.timeSort === "asc" ? "createdAt":"-createdAt"
  const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
  const post = await Post.find(q).sort(timeSort)
  res.status(200).json({
    statue: 200,
    data: post,
  })
}

async function deletePosts(req, res) {
  await Post.deleteMany({})
  await getPosts(req, res)
}

async function createPost(req, res) {
  const {name, content, image, email} = req.body
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
  if (!!id && await Post.findByIdAndDelete(id)) {
    next(appError(404, "刪除失敗：Post找不到該id", next))
  }
  await getPosts(req, res)
}

async function updatePost(req, res) {
  const {content} = req.body
  const id = req.url.split('/').pop()
  await Post.findByIdAndUpdate(id, {
      content,
      updatedAt: Date.now(),
    },
    { runValidators: true })

  await getPosts(req, res)
}

module.exports = {
  getPosts,
  createPost,
  deletePost,
  deletePosts,
  updatePost,
}
