const Post = require('../models/PostModel')

async function getPosts(req, res) {
  const posts = await Post.find().sort('-createdAt').select({ __v: 0 })
  res.status(200).json({
    statue: 200,
    data: posts,
  })
}

async function getPostsEarliest(req, res) {
  const posts = await Post.find().sort('createdAt').select({ __v: 0 })
  res.status(200).json({
    statue: 200,
    data: posts,
  })
}

async function getPostsKeyword(req, res) {
  const keyword = req.url.split('/').pop()
  const query = keyword
    ? {
        content: { $regex: decodeURIComponent(keyword) },
      }
    : ''
  const posts = await Post.find(query).sort('createdAt').select({ __v: 0 })
  res.status(200).json({
    statue: 200,
    data: posts,
  })
}

async function deletePosts(req, res) {
  await Post.deleteMany({})
  await getPosts(req, res)
}

async function createPost(req, res) {
  const { name, content, image, email } = req.body
  if (content && name && email) {
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
  } else {
    res.status(404).send('content or name欄位未填寫正確')
  }
}

async function deletePost(req, res) {
  const id = req.url.split('/').pop()
  if (await Post.findByIdAndDelete(id)) {
    await getPosts(req, res)
  } else {
    res.status(404).send('刪除失敗：Post找不到該id')
  }
}

async function updatePost(req, res) {
  try {
    const { content } = req.body
    const id = req.url.split('/').pop()
    if (
      await Post.findByIdAndUpdate(id, {
        content,
        updatedAt: Date.now(),
      })
    ) {
      await getPosts(req, res)
    } else {
      res.status(404).send('更新失敗：Post找不到該id')
    }
  } catch (err) {
    res.status(404).send('更新失敗')
  }
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
