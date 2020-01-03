const express = require("express");

const validateUserId = require("../middleware/validateUserId");
const validateUser = require("../middleware/validateUser");
const validatePost = require("../middleware/validatePost");
const { get, insert, getUserPosts, remove, update } = require("./userDb");
const { insert: insertPost } = require("../posts/postDb");

const router = express.Router();

router.use("/", validateUser);
router.use("/:id", validateUserId);
router.post("/:id/posts", validatePost);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await get();
      res.status(201).json(users);
    } catch (error) {
      res.status(500).json({
        message: "server issue preventing app from retrieving users"
      });
    }
  })
  .post(async (req, res) => {
    const { body } = req;
    try {
      const userFromBody = body;
      const user = await insert(userFromBody);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({
        message: "server issue preventing user creation"
      });
    }
  });

router
  .route("/:id/posts")
  .get(async ({ user }, res) => {
    try {
      const userPosts = await getUserPosts(user.id);
      res.status(201).json(userPosts);
    } catch (error) {
      res.status(500).json({
        message: "server issue preventing retrieval of posts"
      });
    }
  })
  .post(async ({ user, body }, res) => {
    const postFromBody = { ...body, user_id: user.id };
    try {
      const post = await insertPost(postFromBody);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({
        message: "server issue creating post"
      });
    }
  });

router
  .route("/:id")
  .get(async ({ user }, res) => {
    res.status(201).json(user);
  })
  .delete(async ({ user }, res) => {
    try {
      await remove(user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "server issue with user removal"
      });
    }
  })
  .put(async ({ body, user }, res) => {
    const { name } = body;
    try {
      const updatedUser = { ...user, name };
      await update(user.id, updatedUser);
      res.status(201).json(updatedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "server issue updating user"
      });
    }
  });

module.exports = router;
