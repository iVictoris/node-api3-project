/**
 * Validates the body on a request to create a new user
 * Things it'll do:
 *  if missing body in req body, cancels request and responds with 400 and message
 *  if missing name property in req body, cancel and 400 + message
 */

const validateUser = (req, res, next) => {
  const { body } = req;
  const { name } = body;

  const bodyHasProps = Object.keys().length;

  if (!bodyHasProps) {
    res.status(400).json({
      message: "missing user data"
    });
    return;
  }

  if (!name) {
    res.status(400).json({
      message: "missing required name field"
    });
    return;
  }
  next();
};
