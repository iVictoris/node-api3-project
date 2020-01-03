const express = require("express");

const validateUserId = require("../middleware/validateUserId");
const validateUser = require("../middleware/validateUser");
const { get, insert, getUserPosts, getById, remove, update } = require("./userDb");

const router = express.Router();

router.use("/:id*", validateUserId);
router.use("/", validateUser);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await get();
      res.status(201).json(users);
    } catch (error) {
      res
        .status(500)
        .json({
        message: "server issue preventing app from retrieving users"
      });
    }
  })
  .post(async (req, res) => {
    const { body } = req;
    try {
      const userFromBody = body;
      const user = await insert(userFromBody);
      res
        .status(201)
        .json(user);
    } catch (error) {
      res
        .status(500)
        .json({
        message: "server issue preventing user creation"
      });
    }
  });

router
  .route("/:id/posts")
  .get(async ({ user }, res) => {
    try {
      const userPosts = await getUserPosts(user.id)
      res
        .status(201)
        .json(userPosts);
    } catch (error) {
      res
        .status(500)
        .json({
        message: "server issue preventing retrieval of posts"
      });
    }
  })
  .post(async ({ user }, res) => {
    console.log(user);
  });

router
  .route("/:id")
  .get(async ({ user }, res) => {
    res
      .status(201)
      .json(user);
  })
  .delete(async ({ user }, res) => {
    try {
      await remove(user.id);
      res
        .status(201)
        .json(user);
    } catch (error) {
      res
        .status(500)
        .json({
        message: "server issue with user removal"
      });
    }
  })
  .put(async (req, res) => {
    
  });

module.exports = router;
