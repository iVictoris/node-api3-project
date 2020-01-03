const express = require('express');

const {get, getById, update, remove} = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const posts = await get();
    res
      .status(201)
      .json(posts);
  } catch (error) {
    res
      .status(500)
      .json({
      message: "Server issue retrieving posts"
    });
  }
});

router
  .use(validatePostId)
  .route('/:id')
  .get(async ({post}, res) => {
    res
      .status(201)
      .json(post);
  })
  .delete(async ({post}, res) => {
    try {
      await remove(post.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({
        message: "server issue with post removal"
      });
    }
  })
  .put(async ({body, post}, res) => {
    const { text } = body;
    try {
      const updatedPost = { ...post, text };
      await update(post.id, updatedPost);
      res.status(201).json(updatedPost);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "server issue updating post"
      });
    }
  })

// custom middleware

function validatePostId(req, res, next) {
  const {params: {id}} = req;
  try {
    const postFromId = await getById(id);
    if (!postFromId) {
      return res
        .status(400)
        .json({
        message: "invalid post id"
      });
    }

    req.post = userFromId;
    next();
  } catch (error) {
    res
      .status(500)
      .json({
      message: "Something went wrong with the server when validating post id. Please try again."
    });
  }
}

module.exports = router;
