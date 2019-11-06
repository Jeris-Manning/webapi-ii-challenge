const express = require('express');
const blogPostsRouter = require('./blogPosts/blog-posts-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', blogPostsRouter);

module.exports = server;
