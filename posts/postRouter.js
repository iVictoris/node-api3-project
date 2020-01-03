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
  .delete(async (req, res) => {
  })
  .put(async (req, res) => {
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
