// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User model
const User = require('./models/User');

// Post model
const Post = require('./models/Post');

// Comment model
const Comment = require('./models/Comment');

// User registration
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Middleware to authenticate the user and set req.userId
const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], 'secretkey');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/api/posts', authenticateUser, async (req, res) => {
  const { title, content, category, tags } = req.body;
  try {
    const post = new Post({
      title,
      content,
      category,
      tags,
      author: req.userId,
    });
    await post.save();
    res.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
// Get paginated blog posts
app.get('/api/posts', async (req, res) => {
  const { page = 1, limit = 10, sort, category, tag } = req.query;
  try {
    const skip = (page - 1) * limit;
    const query = {};
    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }
    const sortOption = {};
    if (sort === 'title') {
      sortOption.title = 1;
    } else if (sort === 'date') {
      sortOption.createdAt = -1;
    } else if (sort === 'popularity') {
      sortOption.likes = -1;
    }
    const posts = await Post.find(query)
      .skip(skip)
      .limit(limit)
      .sort(sortOption);
    const totalPosts = await Post.countDocuments(query);
    res.json({
      posts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Search blog posts
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new comment
app.post('/api/comments', async (req, res) => {
  const { content, postId } = req.body;
  try {
    const comment = new Comment({
      content,
      post: postId,
      author: req.userId,
    });
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get comments for a post
app.get('/api/comments/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ post: postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});