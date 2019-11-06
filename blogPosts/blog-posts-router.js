const express = require('express');
const router = express.Router();
const Blog = require('./blogDb.js');

// ******* Post a new blog entry to the database *******

router.post('/', (req, res) => {
  const blogPost = req.body;
  Blog.insert(blogPost)

    .then((entry) => {
      if (blogPost.title && blogPost.contents) {
        res.status(201).json(entry);
      } else {
        res.status(400).json({
          success: false,
          errorMessage: 'Please provide title and contents for the post.'
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: 'There was a server error that prevented your post.'
      });
    });
});

// ******* Get all posts contained in the database *******

router.get('/', (req, res) => {
  Blog.find()
    .then((blog) => {
      res.status(200).json(blog);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: 'The posts information could not be retrieved.'
      });
    });
});

// ******* Get post by unique ID *******

router.get('/:id', (req, res) => {
  const blogPostId = req.params.id;

  Blog.findById(blogPostId)
    .then((blogPost) => {
      if (blogPost.length === 0) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      } else {
        res.status(200).json(blogPost);
      }
    })
    .catch((err) => {
      console.log('error: ', err);
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

// *******  Edits a blog post by post ID *********

router.put('/:id', (req, res) => {
  const postId = req.params.id;
  const changes = req.body;

  Blog.findById(postId)
    .then((blogPost) => {
      if (blogPost.length === 0) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.'
        });
      } else {
        Blog.update(postId, changes).then((updated) => {
          if (updated) {
            Blog.findById(postId).then((updatedPost) => {
              res.status(200).json(updatedPost);
            });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({
          success: false,
          error: 'The post information could not be modified.'
        });
    });
});

// *******  Deletes a blog post by post ID *********

router.delete('/:id', (req, res) => {
  const blogPostId = req.params.id;

  Blog.findById(blogPostId).then((blogPost) => {
    if (blogPost.length === 0) {
      res.status(404).json({
        success: false,
        message: 'The post with the specified ID does not exist'
      });
    } else {
      res.status(200).json(blogPost);
      Blog.remove(blogPostId).then((targetPost) => {
        if (targetPost.length === 0) {
          res
            .status(200)
            .json({ success: true, message: 'Post deleted successfully' });
        }
      });
    }
  });
});

// COMMENT RELATED HTTP REQUESTS

// *******  Post a comment to an existing blog entry by id *********

router.post('/:id/comments', (req, res) => {
  const blogPostId = req.params.id;
  const blogPostComment = req.body;

  Blog.insertComment(blogPostComment)
    .then((comment) => {
      if (!Blog.findById(blogPostId)) {
        res.status(404).json({
          success: false,
          message: 'The post with the specified ID does not exist.'
        });
      } else if (!blogPostComment.text) {
        res.status(400).json({
          success: false,
          errorMessage: 'Please provide text for the comment.'
        });
      } else {
        res.status(201).json({ success: true, id: comment.id });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: 'There was an error while saving the comment to the database'
      });
    });
});

// *******  Returns array of all comments from post with specified id. *********

router.get('/:id/comments', (req, res) => {
  const postId = req.params.id;

  Blog.findPostComments(postId)
    .then((blogPost) => {
      console.log('This is blogPost parameter: ', blogPost);
      if (blogPost.length === 0) {
        res.status(404).json({
          message: 'The blog post with the specified ID does not exist.'
        });
      } else {
        res.status(200).json(blogPost);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: 'There was an error retrieving the comments from the database'
      });
    });
});

// NONE SHALL PASS
module.exports = router;
