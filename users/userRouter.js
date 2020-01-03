const express = require("express");

const validateUserId = require("../middleware/validateUserId");
const { get } = require("./userDb");

const router = express.Router();

router.use("/:id*", validateUserId);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await get();
      res.status(201).json(users);
    } catch (error) {}
  })
  .post(async (req, res) => {});

router
  .route("/:id/posts")
  .get(async ({ user }, res) => {
    console.log(user)
  })
  .post(async ({ user }, res) => {
    console.log(user);
  });

router
  .route("/:id")
  .get(async ({ user }, res) => {
    res
      .status(200)
      .json(user);
  })
  .delete(async ({ user }, res) => {
    console.log(user);
  })
  .put(async ({ user }, res) => {
    console.log(user);
  });

//custom middleware

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
