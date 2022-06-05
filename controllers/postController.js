const _ = require('lodash')
const Post = require('../models/PostModel')
const Comment = require('../models/CommentsModel')
const appError = require('../middlewares/errorHandlers/appErrorHandler')

// 取得所有貼文列表
async function getPosts(req, res) {
  const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt"
  const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
  const post = await Post.find(q).sort(timeSort)
  res.status(200).json({
    statue: 200,
    data: post,
  })
}

// 取得指定貼文列表
async function getPost(req, res) {
  const {id: _id} = req.params;
  const post = await Post.find({_id});
  res.status(200).json({
    statue: 200,
    data: post,
  })
}

// 取得所有貼文列表 ByUser
async function getPostByUser(req, res) {
  const {id} = req.params;
  const post = await Post.find({
    user: id
  })
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
    user: req.user.id,
    createdAt: Date.now(),
  })
  res.status(201).json({
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
    {runValidators: true})

  await getPosts(req, res)
}

// 文章上按個讚
async function addLikes(req, res) {
  const {id: _id} = req.params;
  await Post.findOneAndUpdate(
    {_id},
    {$addToSet: {likes: req.user.id}}
  )
  res.status(200).json({
    status: 'success',
    data: {
      postId: _id,
      userId: req.user.id,
    }
  })
}

// 文章上取消讚
async function delLikes(req, res) {
  const {id: _id} = req.params;
  await Post.findOneAndUpdate(
    {_id},
    {$pull: {likes: req.user.id}}
  )
  res.status(200).json({
    status: 'success',
    data: {
      postId: _id,
      userId: req.user.id,
    }
  })
}

// 新增評論
async function addComment(req, res) {
  const user = req.user.id;
  const post = req.params.id;
  const {comment} = req.body;
  const newComment = await Comment.create({
    post,
    user,
    comment
  })
  res.status(201).json({
    status: 'success',
    data: {
      comments: newComment
    }
  })
}

// 刪除評論
async function delComment(req, res) {
  const commentId = req.params.id
  const result = await Comment.findByIdAndDelete(commentId)
  const message = (result) || '成功刪除'
  res.status(200).json({
    status: 'success',
    message,
  })
}


module.exports = {
  getPostByUser,
  getPost,
  getPosts,
  createPost,
  deletePost,
  deletePosts,
  updatePost,
  addLikes,
  delLikes,
  addComment,
  delComment,
}
