const express = require('express');
const blogPostsRouter = require('./blogPosts/blog-posts-router.js');
const cors = require('cors');

const server = express();

server.use(express.json());

server.use(cors());

server.use('/api/posts', blogPostsRouter);

module.exports = server;
