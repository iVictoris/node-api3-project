/**
 * validates user id on reqs that expect a user id
 * /:id*
 */

const {getById} = require('../users/userDb');

const validateUserId = async (req, res, next) => {
  const {params: {id}} = req;
  try {
    const userFromId = await getById(id);
    if (!userFromId) {
      return res
        .status(400)
        .json({
        message: "invalid user id"
      });
    }

    req.user = userFromId;
    next();
  } catch (error) {
    res
      .status(500)
      .json({
      message: "Something went wrong with the server when validating user id. Please try again."
    });
  }
}

module.exports = validateUserId;