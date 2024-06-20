const Post = require('../models/post');

exports.getAll = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

exports.create = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

exports.update = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

exports.delete = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};
