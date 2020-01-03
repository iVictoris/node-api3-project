const express = require("express");

const validateUserId = require("../middleware/validateUserId");
const validateUser = require("../middleware/validateUser");
const { get, insert } = require("./userDb");

const router = express.Router();

router.use("/:id*", validateUserId);
router.use("/", validateUser);

router
  .route("/")
  .get(async (req, res) => {
    try {
      const users = await get();
      res.status(201).json(users);
    } catch (error) {}
  })
  .post(async (req, res) => {
    const { body } = req;
    try {
      const userFromBody = body;
      const user = await insert(userFromBody);
      res
        .status(201)
        .json(user);
    } catch (error) {}
  });

router
  .route("/:id/posts")
  .get(async ({ user }, res) => {
    console.log(user);
  })
  .post(async ({ user }, res) => {
    console.log(user);
  });

router
  .route("/:id")
  .get(async ({ user }, res) => {
    res.status(200).json(user);
  })
  .delete(async ({ user }, res) => {
    console.log(user);
  })
  .put(async ({ user }, res) => {
    console.log(user);
  });

module.exports = router;
