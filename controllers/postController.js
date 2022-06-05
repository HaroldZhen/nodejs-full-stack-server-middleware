const _ = require('lodash')
const Post = require('../models/PostModel')
const appError = require('../middlewares/errorHandlers/appErrorHandler')

// 取得貼文列表
async function getPosts(req, res) {
  const timeSort = req.query.timeSort === "asc" ? "createdAt":"-createdAt"
  const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
  const post = await Post.find(q).sort(timeSort)
  res.status(200).json({
    statue: 200,
    data: post,
  })
}

// 取得指定貼文列表
async function getPost(req, res) {
  const {id:_id} = req.params;
  const post = await Post.find({_id});
  res.status(200).json({
    statue: 200,
    data: post,
  })
}

// 新增貼文
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

// 刪除所有貼文
async function deletePosts(req, res) {
  await Post.deleteMany({})
  await getPosts(req, res)
}

// 刪除指定
async function deletePost(req, res, next) {
  const id = req.url.split('/').pop()
  if (!!id && await Post.findByIdAndDelete(id)) {
    next(appError(404, "刪除失敗：Post找不到該id", next))
  }
  await getPosts(req, res)
}

// 編輯指定
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
  getPost,
  getPosts,
  createPost,
  deletePost,
  deletePosts,
  updatePost,
}
